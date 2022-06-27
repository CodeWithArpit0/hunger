import styles from "../styles/Footer.module.css";
import Image from "next/image";
import brandLogo from "../public/images/logo2.png";
import pizzaLogo from "../public/images/pizza_logo2.png";
import Link from "next/link";
import { FaFacebook } from "react-icons/fa";
import { BsTwitter, BsInstagram } from "react-icons/bs";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerWrapper}>
        <div className={styles.brand}>
          <div className={styles.brandLogo}>
            <div className={styles.pizzaLogo}>
              <Image src={pizzaLogo} objectFit="cover" />
            </div>
            <div className={styles.brandLogoGroup}>
              <div className={styles.logo}>
                <Image src={brandLogo} objectFit="cover" />
              </div>
              <div className={styles.brandHead}>
                <h2>Order Pizza online</h2>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.footerContent}>
          <div className={styles.footerLinks}>
            <h3>ORDER NOW</h3>

            <div className={styles.list}>
              <Link href="/menu/deals" passHref>
                <p>Deals</p>
              </Link>
              <Link href="/menu/deals" passHref>
                <p>Pizza</p>
              </Link>
              <Link href="/menu/deals" passHref>
                <p>Sides</p>
              </Link>
              <Link href="/menu/deals" passHref>
                <p>Drinks</p>
              </Link>
              <Link href="/menu/deals" passHref>
                <p>Desserts</p>
              </Link>
            </div>
          </div>
          <div className={styles.footerLinks}>
            <h3>ABOUT</h3>

            <div className={styles.list}>
              <Link href="/menu/deals" passHref>
                <p>About Us</p>
              </Link>
              <Link href="/menu/deals" passHref>
                <p>Contactless delivery</p>
              </Link>
              <Link href="/menu/deals" passHref>
                <p>Nutrition</p>
              </Link>
            </div>
          </div>
          <div className={styles.footerLinks}>
            <h3>OUR POLICIES</h3>

            <div className={styles.list}>
              <Link href="/menu/deals" passHref>
                <p>Privacy</p>
              </Link>
              <Link href="/menu/deals" passHref>
                <p>Terms & Conditions</p>
              </Link>
              <Link href="/menu/deals" passHref>
                <p>Responsible disclosure</p>
              </Link>
              <Link href="/menu/deals" passHref>
                <p>FAQs & Help</p>
              </Link>
            </div>
          </div>
          <div className={styles.socialMeidaLinks}>
            <h3>FOLLOW US</h3>
            <div className={styles.footerSocialLinks}>
              <div className={styles.Link}>
                <Link href="https://www.facebook.com/" passHref>
                  <FaFacebook className={styles.footerSocialIcon}/>
                </Link>
              </div>
              <div className={styles.Link}>
                <Link href="https://www.instagram.com/" passHref>
                  <BsInstagram className={styles.footerSocialIcon}/>
                </Link>
              </div>
              <div className={styles.Link}>
                <Link href="https://www.twitter.com/" passHref>
                  <BsTwitter className={styles.footerSocialIcon}/>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.copyright}>
        <p>All Rights Reserved. Copyright © Hunger Pvt Ltd.</p>
      </div>
    </footer>
  );
}
