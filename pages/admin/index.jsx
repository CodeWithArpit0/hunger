import { useState } from "react";
import styles from "../../styles/Admin.module.css";
import Image from "next/Image";
import axios from "axios";
import ProductDetails from "../../components/productDetails";

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

        {pizzaList ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Product</th>
                <th>ID</th>
                <th>Title</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pizzaList.map((product) => (
                <tr className={styles.trTitle} key={product._id}>
                  <td>
                    <Image
                      src={product.img}
                      width={60}
                      height={60}
                      objectFit="cover"
                      alt=""
                    />
                  </td>
                  <td>{product._id.slice(0, 5)}...</td>
                  <td>{product.title}</td>
                  <td>${product.prices[0]}</td>
                  <td>
                    <button className={styles.button}>Edit</button>
                    <button
                      className={styles.button}
                      onClick={() => deleteProduct(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h2 style={{ color: "#bababa" }}>
            No products avaliable at this moment!
          </h2>
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

        {orderList ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer Name</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orderList.map((order) => (
                <tr key={order._id}>
                  <td>{order._id.slice(0, 5)}...</td>
                  <td>{order.customer_name}</td>
                  <td>${order.total}</td>
                  <td>
                    {order.method === 0 ? (
                      <span>Cash</span>
                    ) : (
                      <span>Paid on Paypal</span>
                    )}
                  </td>
                  <td>{status[order.status]}</td>
                  <td>
                    <button
                      className={styles.button}
                      onClick={() => handleStatus(order._id)}
                    >
                      Next Stage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h2 style={{ color: "#bababa" }}>
            No orders avaliable at this moment!
          </h2>
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
