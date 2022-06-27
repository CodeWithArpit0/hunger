import { useState } from "react";
import styles from "../../styles/Admin.module.css";
import axios from "axios";
import ProductDetails from "../../components/productdetails";
import ProductRow from "../../components/Admin/ProductRow";
import OrderRow from "../../components/Admin/OrderRow";
import BlankList from "../../components/Admin/blankList";

export default function Admin({ orders, products }) {
  const [pizzaList, setPizzaList] = useState(products);
  const [orderList, setOrderList] = useState(orders);
  const [isModelOpem, setIsModelOpen] = useState(false);

  const status = ["Preparing", "On the way", "Delivered"];

  const deleteProduct = async (productID) => {
    try {
      await axios.delete("http://localhost:3000/api/products/" + productID);
      setPizzaList(pizzaList.filter((pizza) => pizza._id !== productID));
    } catch (err) {
      console.log(err);
    }
  };

  async function handleStatus(orderID) {
    const item = orderList.filter((order) => order._id === orderID)[0];
    const currentStatus = item.status;
    try {
      const res = await axios.put(
        "http://localhost:3000/api/orders/" + orderID,
        { status: currentStatus + 1 }
      );

      setOrderList([
        res.data,
        ...orderList.filter((order) => order._id !== orderID),
      ]);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>Products</h1>

        {pizzaList !== 0 ? (
          <ProductRow pizzaList={pizzaList} deleteProduct={deleteProduct}/>
        ) : (
          <BlankList/>
        )}
        <div>
          <button
            className={styles.addButton}
            onClick={() => setIsModelOpen(true)}
          >
            Add Product
          </button>
          {isModelOpem && <ProductDetails setIsModelOpen={setIsModelOpen} />}
        </div>
      </div>

      <div className={styles.item}>
        <h1 className={styles.title}>Orders</h1>
        {orderList.length !== 0 ? (
          <OrderRow orderList={orderList} />
        ) : (
          <BlankList/>
        )}
      </div>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }
  const productRes = await axios.get("http://localhost:3000/api/products");
  const orderRes = await axios.get("http://localhost:3000/api/orders");

  return {
    props: {
      orders: orderRes.data,
      products: productRes.data,
    },
  };
};
