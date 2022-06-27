import styles from "../styles/PizzaCard.module.css";
import Image from "next/image";
import Link from "next/link";

export default function PizzaCard({ pizza }) {
  return (
    <div className={styles.container} title={pizza.title}>
      <Link href={`/products/${pizza._id}`} passHref>
        <Image src={pizza.img} alt="" width="500" height="500" />
      </Link>
      <h1 className={styles.title}>{pizza.title}</h1>
      <span className={styles.price}>Rs. {pizza.prices[0]}</span>
      <p className={styles.desc}>{pizza.desc}</p>
    </div>
  );
}
