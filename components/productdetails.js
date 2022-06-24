import axios from "axios";
import { useState } from "react";
import styles from "../styles/ProductDetails.module.css";

export default function ProductDetails({ setIsModelOpen }) {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [prices, setPrices] = useState([]);
  const [extraOptions, setExtraOptions] = useState([]);
  const [extra, setExtra] = useState(null);
  const [isAdded, setIsAdded] = useState(false);

  async function handleCreate() {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "hunger_products");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/hunge-pizza/image/upload",
        data
      );
      const { url } = uploadRes.data;
      const newProduct = {
        title,
        desc,
        prices,
        extraOptions,
        img: url,
      };

      await axios.post("http://localhost:3000/api/products", newProduct);
      setIsModelOpen(false);
    } catch (err) {
      console.log(err);
    }
  }

  function handleExtraInput(e) {
    setExtra({ ...extra, [e.target.name]: e.target.value });
  }

  function handleExtra(e) {
    setExtraOptions((prev) => [...prev, extra]);
    setIsAdded(true);
    setInterval(() => {
      setIsAdded(false);
    }, 2500);
  }

  function changePrice(e, index) {
    const currentPrices = prices;
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1 className={styles.title}>Add New Product</h1>
          <button
            className={styles.closeModelBtn}
            onClick={() => setIsModelOpen(false)}
          >
            x
          </button>
        </div>
        <div className={styles.innerWrapper}>
          <div className={styles.item}>
            <label htmlFor="product_name" className={styles.label}>
              Product Name
            </label>
            <input
              type="text"
              placeholder="Peporani Pizza"
              className={styles.input}
              id="product_name"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={styles.item}>
            <label htmlFor="product_price" className={styles.label}>
              Product Price ($)
            </label>

            <div className={styles.subItem}>
              <input
                type="text"
                placeholder="Small 3$"
                className={styles.priceInput}
                onChange={(e) => changePrice(e, 0)}
              />
              <input
                type="text"
                placeholder=" Medium 4.4$"
                className={styles.priceInput}
                onChange={(e) => changePrice(e, 1)}
              />
              <input
                type="text"
                placeholder="Large 5.5$"
                className={styles.priceInput}
                onChange={(e) => changePrice(e, 2)}
              />
            </div>
          </div>
          <div className={styles.item}>
            <label htmlFor="product_extras" className={styles.label}>
              Product Extras
            </label>

            <div className={styles.subItem}>
              <input
                type="text"
                placeholder="Extra Cheese"
                className={styles.extraInput}
                id="product_extras"
                name="text"
                onChange={(e) => handleExtraInput(e)}
              />
              <input
                type="text"
                placeholder="0.2$"
                className={styles.extraInput}
                name="price"
                onChange={(e) => handleExtraInput(e)}
              />
              <button className={styles.extraBtn} onClick={handleExtra}>
                Add
              </button>
            </div>
            {isAdded && (
              <span className={styles.extraMsg}>
                Extras material added succesfully.
              </span>
            )}
          </div>

          <div className={styles.item}>
            <label htmlFor="product_desc" className={styles.label}>
              Product Description
            </label>
            <textarea
              className={styles.desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Write something about your product.."
            ></textarea>
          </div>

          <div className={styles.item}>
            <label
              htmlFor="product_image"
              title="Add Product Image"
              className={styles.productImage}
            >
              Upload Product Image
            </label>
            <input
              type="file"
              id="product_image"
              onChange={(e) => setFile(e.target.files[0])}
              hidden
            />
            <button className={styles.productAddBtn} onClick={handleCreate}>
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
