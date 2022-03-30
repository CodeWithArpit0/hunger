import styles from "../styles/Footer.module.css";
import Image from "next/Image";

export default function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.footerImage}>
        <Image src="/images/bg.png" layout="fill" alt="" objectFit="cover" />
      </div>
      <div className={styles.footerMain}>
        <div className={styles.detailsContainer}>
          <div className={styles.card}>
            <h2 className={styles.motto}>
              OH YES, WE DID. THE HUNGER PIZZA, WELL BAKED SLICE OF PIZZA.
            </h2>
          </div>

          <div className={styles.card}>
            <h1 className={styles.title}>FIND OUR RESTAURANTS</h1>
            <p className={styles.text}>
              {" "}
              Building No.16 Bhoorapir Churaha, <br />
              Hathras, 204101
              <br /> Uttar Pradesh , INDIA
            </p>
          </div>
          <div className={styles.card}>
            <h1 className={styles.title}>WORKING HOURS</h1>
            <p className={styles.text}>
              SATURDAY - SUNDAY <br /> 10:00 - 12:00
            </p>
          </div>
        </div>
        <div className={styles.footerLogo}>
          <div className={styles.pizzaLogo}>
            <Image
              src="/images/pizza_logo2.png"
              alt=""
              width="250"
              height="250"
            />
          </div>
          <div className={styles.brandLogo}>
            <Image src="/images/logo2.png" alt="" width="400" height="200" />
          </div>
        </div>
        <div className={styles.copyrightContianer}>
          <p>All Rights Reserved &copy; 2022 - 2023</p>
        </div>
      </div>
    </div>
  );
}
