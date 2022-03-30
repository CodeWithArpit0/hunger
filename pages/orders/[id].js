import styles from "../../styles/Orders.module.css";
import Image from "next/image";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { upateNoOfProducts } from "../../redux/cartSlice";
import { updateCurrentUser } from "../../redux/userSlice";

export default function Order({ order }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    async function updateCart() {
      try {
        await axios.put("https://hunger-alpha.vercel.app/api/cart", {
          _id: currentUser._id,
          cart: [],
          cartTotal: 0,
        });

        dispatch(upateNoOfProducts(0));
        dispatch(updateCurrentUser(currentUser));
      } catch (err) {
        console.log(err);
      }
    }

    updateCart();
  });
  const status = 0;

  function statusClass(index) {
    if (index - status < 1) return styles.done;
    if (index - status === 1) return styles.inProgress;
    if (index - status > 1) return styles.unDone;
  }
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.row}>
          <table className={styles.table}>
            <tr className={styles.tableHeader}>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Customer Phone</th>
              <th>Address</th>
              <th>Total</th>
            </tr>
            <tr>
              <td>
                <span className={styles.id}>{order._id}</span>
              </td>
              <td>
                <span className={styles.name}>{order.customer_name}</span>
              </td>
              <td>
                <span className={styles.name}>{order.customer_phone}</span>
              </td>
              <td>
                <span className={styles.address}>{order.customer_address}</span>
              </td>
              <td>
                <span className={styles.orderTotal}>${order.total}</span>
              </td>
            </tr>
          </table>
        </div>
        <div className={styles.row}>
          <OrderStatusIcon
            img="/images/paid.png"
            title="Payment"
            statusClass={statusClass}
            status={0}
          />
          <OrderStatusIcon
            img="/images/bake.png"
            title="Preparing"
            statusClass={statusClass}
            status={1}
          />
          <OrderStatusIcon
            img="/images/bike.png"
            title="On the way"
            statusClass={statusClass}
            status={2}
          />
          <OrderStatusIcon
            img="/images/delivered.png"
            title="Delivered"
            statusClass={statusClass}
            status={3}
          />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.subTotal}>
            <b className={styles.totalTextTitle}>Subtotal : </b>${order.total}
          </div>
          <div className={styles.discount}>
            <b className={styles.totalTextTitle}>Discount : </b>$0.00
          </div>
          <div className={styles.total}>
            <b className={styles.totalTextTitle}>Total : </b>${order.total}
          </div>
          <button disabeled className={styles.button}>
            PAID
          </button>
        </div>
      </div>
    </div>
  );
}

function OrderStatusIcon({ img, title, statusClass, status }) {
  return (
    <div className={statusClass(status)}>
      <Image src={img} width={30} height={30} alt="" />
      <span>{title}</span>
      <div className={styles.checkedIcon}>
        <Image
          src="/images/checked.png"
          className={styles.checkedIcon}
          width={20}
          height={20}
          alt=""
        />
      </div>
    </div>
  );
}

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(`http://localhost:3000/api/orders/${params.id}`);

  return {
    props: { order: res.data },
  };
};
