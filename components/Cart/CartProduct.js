import Image from "next/image";
import axios from "axios";
import styles from "../../styles/ProductCard.module.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateCart } from "../../redux/cartSlice";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const [cart, setCart] = useState(useSelector((state) => state.cart));

  const CurrentUser = useSelector((state) => state.user.currentUser);

  // ** Function to delete the product from cart
  async function deleteProduct(ProductID) {
    let updatedCart = {};
    updatedCart.products = cart.products.filter((product) => {
      if (product._id === ProductID) {
        updatedCart.deletingProductPrice = product.price;
        return false;
      }
      return true;
    });

    setCart({ ...cart, products: updatedCart.products });
    dispatch(updateCart({ updatedCart }));

    const userID = CurrentUser._id;
    const res = await axios.post("http://localhost:3000/api/cart", {
      userID,
      ProductID,
    });
    console.log(res);
  }
  return (
    <div className={styles.productCard}>
      <div className={styles.productImgBox}>
        <Image src={product.img} alt="" layout="fill" objectFit="cover" />
      </div>
      <div className={styles.cardContent}>
        <div className={styles.item}>
          <h1 className={styles.title}>{product.title}</h1>
        </div>
        <div className={styles.item}>
          <p>{product.desc}</p>
        </div>
        <div className={styles.extraOptionsBox}>
          {product.extraOptions.length === 0 ? (
            <span>-</span>
          ) : (
            product.extraOptions.map((extra) => (
              <div className={styles.extraOption} key={extra._id}>
                <input type="checkbox" checked />
                <label>{extra.text}</label>
              </div>
            ))
          )}
        </div>
        <div className={styles.item}>
          <h3 className={styles.price}>Price : ${product.price}</h3>
        </div>
        <div className={styles.quantity}>
          <p>Quantity : {product.quantity}</p>
        </div>
        <div className={styles.total}>
          <p>Total : ${product.quantity * product.price}</p>
        </div>
        <div className={styles.options}>
          <button
            onClick={() => {
              deleteProduct(product._id);
            }}
          >
            Delete
          </button>
          <button>Save for later</button>
        </div>
      </div>
    </div>
  );
}
