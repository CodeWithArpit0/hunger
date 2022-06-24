import { useState } from "react";
import styles from "../../styles/Product.module.css";
import Image from "next/image";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../redux/cartSlice";
import Router from "next/router";

export default function Product({ pizza }) {
  const [size, setSize] = useState(0);
  const [price, setPrice] = useState(pizza.prices[0]);
  const [extras, setExtras] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const currentUser = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart);

  function changePrice(number) {
    setPrice(price + number);
  }

  function handleSize(sizeIndex) {
    const difference = pizza.prices[sizeIndex] - pizza.prices[size];
    setSize(sizeIndex);
    changePrice(difference);
  }

  function handleChange(e, option) {
    const checked = e.target.checked;
    if (checked) {
      changePrice(option.price);
      setExtras((prev) => [...prev, option]);
    } else {
      changePrice(-option.price);
      setExtras(
        extras.filter((extra) => {
          return extra._id !== option.id;
        })
      );
    }
  }

  async function addToCart() {
    if (isLoggedIn) {
      dispatch(addProduct({ ...pizza, extras, price, quantity }));

      try {
        const total = price * quantity;
        const cartTotal = cart.total + total;
        console.log("The cart total is : " + cartTotal);
        
        await axios.put("http://localhost:3000/api/cart", {
          product: {
            ...pizza,
            price,
            total,
            quantity,
          },
          _id: currentUser._id,
          cartTotal: cartTotal,
          extras: extras,
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      Router.push("/login");
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={pizza.img} layout="fill" objectFit="contain" alt="" />
        </div>
      </div>

      <div className={styles.right}>
        <h1 className={styles.title}>{pizza.title}</h1>
        <span className={styles.price}>${price}</span>
        <p className={styles.desc}>{pizza.desc}</p>
        <h3 className={styles.choose}>Choose the size</h3>

        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => handleSize(0)}>
            <Image src="/images/size.png" layout="fill" alt="" />
            <span className={styles.number}>Small</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(1)}>
            <Image src="/images/size.png" layout="fill" alt="" />
            <span className={styles.number}>Medium</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(2)}>
            <Image src="/images/size.png" layout="fill" alt="" />
            <span className={styles.number}>Large</span>
          </div>
        </div>

        <h3 className={styles.choose}>Choose additional ingredients</h3>
        <div className={styles.ingredients}>
          {pizza.extraOptions.map((option) => (
            <div className={styles.option} key={option._id}>
              <input
                type="checkbox"
                name={option.text}
                className={styles.checkbox}
                onChange={(e) => handleChange(e, option)}
              />
              <label>{option.text}</label>
            </div>
          ))}
        </div>
        <div className={styles.add}>
          <input
            type="number"
            defaultValue={1}
            className={styles.quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <button className={styles.button} onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(
    `http://localhost:3000/api/products/${params.id}`
  );
  return {
    props: {
      pizza: res.data,
    },
  };
};
