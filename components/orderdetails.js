import { useState } from "react";
import styles from "../styles/OrderDetails.module.css";

export default function OrderDetails({ total, createOrder }) {
  const [customer_name, setCustomerName] = useState("");
  const [customer_phone, setCustomerPhone] = useState("");
  const [customer_address, setCustomerAddress] = useState("");

  function handleClick() {
    createOrder({
      customer_name,
      customer_phone,
      customer_address,
      total,
      method: 0,
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>You will pay ${total} after delivery.</h1>
        <div className={styles.item}>
          <label className={styles.label}>Full Name</label>
          <input
            placeholder="John Doe"
            type="text"
            className={styles.input}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Phone</label>
          <input
            placeholder="91+ 7017339221"
            type="text"
            className={styles.input}
            onChange={(e) => setCustomerPhone(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Address</label>
          <input
            placeholder="Elton St. 505 NY"
            type="text"
            className={styles.input}
            onChange={(e) => setCustomerAddress(e.target.value)}
          />
        </div>
        <button className={styles.button} onClick={handleClick}>
          Order Now
        </button>
      </div>
    </div>
  );
}
