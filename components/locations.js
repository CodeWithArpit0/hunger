import styles from "../styles/Locations.module.css";
import Image from "next/image";

export default function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.footerImage}>
        <Image src="/images/bg.png" layout="fill" alt="" objectFit="cover" />
      </div>
      <div className={styles.footerMain}>
        <div className={styles.detailsContainer}>
          <div className={styles.motto}>
            <h2>
              OH YES, WE DID. THE HUNGER PIZZA, WELL BAKED SLICE OF PIZZA.
            </h2>
          </div>

          <div className={styles.locationCard}>
            <div className={styles.locationHeader}>
              <h2 className={styles.title}>FIND OUR <br/>RESTAURANTS</h2>
              <h2 className={styles.title}>WORKING HOURS</h2>
            </div>
            <div className={styles.locations}>
              <div className={styles.locationDetails}>
                <p className={styles.text}>
                  Building No.16 Bhoorapir Churaha, <br />
                  Hathras, 204101
                  <br /> Uttar Pradesh , INDIA
                </p>

                <p className={styles.text}>
                  SATURDAY - SUNDAY <br /> 10:00 - 12:00
                </p>
              </div>
              <div className={styles.locationDetails}>
                <p className={styles.text}>
                  Building No.16 Bhoorapir Churaha, <br />
                  Hathras, 204101
                  <br /> Uttar Pradesh , INDIA
                </p>

                <p className={styles.text}>
                  SATURDAY - SUNDAY <br /> 10:00 - 12:00
                </p>
              </div>
              <div className={styles.locationDetails}>
                <p className={styles.text}>
                  Building No.16 Bhoorapir Churaha, <br />
                  Hathras, 204101
                  <br /> Uttar Pradesh , INDIA
                </p>

                <p className={styles.text}>
                  SATURDAY - SUNDAY <br /> 10:00 - 12:00
                </p>
              </div>
              <div className={styles.locationDetails}>
                <p className={styles.text}>
                  Building No.16 Bhoorapir Churaha, <br />
                  Hathras, 204101
                  <br /> Uttar Pradesh , INDIA
                </p>

                <p className={styles.text}>
                  SATURDAY - SUNDAY <br /> 10:00 - 12:00
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
