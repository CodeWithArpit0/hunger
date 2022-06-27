import styles from "../../styles/Admin.module.css";
import Image from "next/image";

export default function ProductRow({pizzaList, deleteProduct}){
    return(
        <table className={styles.table}>
        <thead>
          <tr>
            <th>Product</th>
            <th>ID</th>
            <th>Product Title</th>
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
                  alt="Product Avatar"
                />
              </td>
              <td>{product._id.slice(0, 5)}...</td>
              <td>{product.title}</td>
              <td>Rs. {product.prices[0]}</td>
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
    );
}