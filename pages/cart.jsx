import styles from "../styles/Cart.module.css";
import Image from "next/Image";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { reset } from "../redux/cartSlice";
import OrderDetails from "../components/OrderDetails";

export default function Cart() {
  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { isLoggedIn } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);
  // ** const { currentUser } = useSelector((state) => state.user);

  // useEffect(async () => {
  //   try {
  //     const res = await axios.post("http://localhost:3000/api/cart", {
  //       _id: currentUser._id,
  //     });
  //     dispatch(initializeCart(res.data));
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, []);

  const createOrder = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/api/orders", data);
      res.status === 201 && router.push("/orders/" + res.data._id);
      dispatch(reset());
    } catch (err) {
      console.log(err);
    }
  };

  // ** This values are the props in the UI
  const amount = cart.total;
  const currency = "USD";
  const style = { layout: "vertical" };
  // ** Custom component to wrap the PayPalButtons and handle currency changes
  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              const shipping = details.purchase_units[0].shipping;
              createOrder({
                customer: shipping.name.full_name,
                address: "Bhoorapir churaha Hathras",
                total: cart.total,
                method: 1,
              });
            });
          }}
        />
      </>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableHeader}>
              <th>Product</th>
              <th>Product Name</th>
              <th>Extras</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {cart.products.map((product, index) => (
              <Product product={product} key={index} />
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.subTotal}>
            <b>Subtotal : </b>${cart.total}
          </div>
          <div className={styles.discount}>
            <b>Discount : </b>${cart.discount}
          </div>

          <div className={styles.grandTotal}>
            <b>Total : </b>${cart.total}
          </div>
          {open ? (
            <div className={styles.paymentMethods}>
              <button
                className={styles.payButton}
                onClick={() => setCash(true)}
              >
                Cash On Delivery
              </button>
              <PayPalScriptProvider
                options={{
                  "client-id":
                    "Adb9gJ_LMdcMwn7nMHu6VRx718UftqbTHfwmej1M3hzZCB2Uh3REUTIKegjDaBLFX08oSKfZ3EttCH-a",
                  components: "buttons",
                  currency: "CAD",
                  "disable-funding": "credit,card,p24",
                }}
              >
                <ButtonWrapper currency={currency} showSpinner={false} />
              </PayPalScriptProvider>
            </div>
          ) : (
            <button className={styles.button} onClick={() => setOpen(true)}>
              CHECKOUT NOW!
            </button>
          )}
        </div>
      </div>
      {cash && <OrderDetails total={cart.total} createOrder={createOrder} />}
    </div>
  );
}

function Product({ product }) {
  return (
    <tr className={styles.tableRow}>
      <td>
        <div className={styles.imgContainer}>
          <Image src={product.img} alt="" layout="fill" objectFit="cover" />
        </div>
      </td>
      <td>
        <span className={styles.name}>{product.title}</span>
      </td>
      <td>
        <span className={styles.extras}>
          {product.extraOptions.length === 0 ? (
            <span>-</span>
          ) : (
            product.extraOptions.map((extra) => (
              <span key={extra._id}>{extra.text}, </span>
            ))
          )}
        </span>
      </td>
      <td>
        <span className={styles.price}>${product.price}</span>
      </td>
      <td>
        <span className={styles.quantity}>{product.quantity}</span>
      </td>
      <td>
        <span className={styles.protuctTotal}>
          ${product.price * product.quantity}
        </span>
      </td>
    </tr>
  );
}
