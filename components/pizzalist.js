import PizzaCard from "./pizzacard";
import styles from "../styles/PizzaList.module.css";

export default function PizzaList({ pizzaList }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>THE BEST PIZZA IN TOWN</h1>
      <p className={styles.desc}>
        Order a delicious pizza on the go, anywhere, anytime. Pizza Hut is happy
        to assist you with your home delivery. Every time you order, you get a
        hot and fresh pizza delivered at your doorstep in less than
      </p>
      <div className={styles.wrapper}>
        {pizzaList.map((pizza) => (
          <PizzaCard key={pizza._id} pizza={pizza} />
        ))}
      </div>
    </div>
  );
}
