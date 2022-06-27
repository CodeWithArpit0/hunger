import styles from "../../styles/Cart.module.css";
import CartProduct from "./CartProduct";

export default function CartProductList({products}) {
  return <div className={styles.cartProductList}>
  {products.map((product, index) => (
    <CartProduct product={product} key={index} />
  ))}
  </div>;
}
