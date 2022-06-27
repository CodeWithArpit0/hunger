import styles from "../styles/Cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { reset } from "../redux/cartSlice";
import Image from "next/image";
import OrderDetails from "../components/orderdetails";
import CartProductList from "../components/Cart/CartProductList";
import blankCartImg from "../public/images/blank-cart.png";

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

  const createOrder = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/api/orders", data);
      res.status === 201 && router.push("/orders/" + res.data._id);
      dispatch(reset());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        {cart.products.length !== 0 ? (
          <CartProductList products={cart.products} />
        ) : (
          <div className={styles.blankCartBox}>
            <div className={styles.blankWrapper}>
              <div className={styles.blankCartLogo}>
                <Image src={blankCartImg} objectFit="cover" />
              </div>
              <h1 className={styles.emptyCartHeading}>Your cart is empty!</h1>
            </div>
          </div>
        )}
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
          <div className={styles.discount}>
            <b>Delivery Charges : </b>$1
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
            </div>
          ) : (
            <button
              className={styles.checkOutBtn}
              onClick={() => setOpen(true)}
            >
              CHECKOUT NOW!
            </button>
          )}
        </div>
      </div>
      {cash && <OrderDetails total={cart.total} createOrder={createOrder} />}
    </div>
  );
}
