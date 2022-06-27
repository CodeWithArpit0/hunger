import styles from "../../styles/Admin.module.css";
import blankImg from "../../public/images/blank.png";
import Image from "next/image";

export default function BlankList() {
  return (
    <div className={styles.noOrderContainer}>
      <div className={styles.blankWrapper}>
        <div className={styles.blankImgBox}>
          <Image src={blankImg} objectFit="cover" />
        </div>
        <h2 className={styles.blankHeading}>
          No orders avaliable at this moment!
        </h2>
      </div>
    </div>
  );
}
