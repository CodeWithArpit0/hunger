import styles from "../styles/Navbar.module.css";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../redux/userSlice";
import { IoIosArrowDown } from "react-icons/io";
import Router from "next/router";

export default function Navbar() {
  const dispatch = useDispatch();
  const { isLoggedIn, currentUser } = useSelector((state) => state.user);
  const { noOfProducts } = useSelector((state) => state.cart);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [dropDownBtnStyle, setDropDownBtnStyle] = useState({});

  const dropDownIconRef = useRef();

  function showDropDown() {
    if (isDropDownOpen) {
      const btnStyle = {
        transform: "rotate(360deg)",
      };
      setDropDownBtnStyle(btnStyle);
      setIsDropDownOpen(false);
    } else {
      const btnStyle = {
        transform: "rotate(180deg)",
      };
      setDropDownBtnStyle(btnStyle);
      setIsDropDownOpen(true);
    }
  }

  async function handleLogout() {
    try {
      const res = await axios.post(
        "https://hunger-alpha.vercel.app/api/logout"
      );
      if (res.status === 200) {
        dispatch(reset());
        Router.push("/login");
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.callButton}>
          <Image
            src="/images/telephone.png"
            alt="telephone.png"
            width="30"
            height="30"
          />
        </div>
        <div className={styles.texts}>
          <div className={styles.text}>ORDER NOW</div>
          <div className={styles.text}>91+ 7017339221</div>
        </div>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
          <Link href="/" passHref>
            <li className={styles.listItem} title="Home">
              Home
            </li>
          </Link>
          <Link href="/products" passHref>
            <li className={styles.listItem} title="Products">
              Products
            </li>
          </Link>
          <Link href="/menu" passHref>
            <li className={styles.listItem} title="Menu">
              Menu
            </li>
          </Link>
          <Link href="/" passHref>
            <Image
              src="/images/logo2.png"
              alt="logo png"
              width="140px"
              height="60px"
              className={styles.logo}
            />
          </Link>
          <Link href="/event" passHref>
            <li className={styles.listItem} title="Event">
              Event
            </li>
          </Link>
          <Link href="/blog" passHref>
            <li className={styles.listItem} title="Blog">
              Blog
            </li>
          </Link>
          <Link href="/contact" passHref>
            <li className={styles.listItem} title="Contact">
              Contact
            </li>
          </Link>
        </ul>
      </div>

      <div className={styles.item}>
        {isLoggedIn ? (
          <div className={styles.UserDet}>
            <div className={styles.userName}>
              <div className={styles.avatar}>
                <Image
                  src="/images/pizza5.png"
                  alt="user avatar"
                  width="35"
                  height="35"
                  className={styles.userPizzaImage}
                />
              </div>
              <p className={styles.username}>{currentUser.fullname}</p>
              <button className={styles.dropDownBtn} onClick={showDropDown}>
                <IoIosArrowDown
                  style={dropDownBtnStyle}
                  className={styles.dropDownArrow}
                  ref={dropDownIconRef}
                />
              </button>
              {isDropDownOpen && (
                <div className={styles.dropDown}>
                  <Link href="/profile" passHref>
                    <div className={styles.dropDownItem} title="Profile">
                      Profile
                    </div>
                  </Link>
                  <div
                    className={styles.dropDownItem}
                    title="Logout"
                    onClick={handleLogout}
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>

            <Link href="/cart" passHref>
              <div className={styles.cart} title="Cart">
                <Image
                  src="/images/cart.png"
                  alt="logo png"
                  width="30px"
                  height="30px"
                />
                <div className={styles.counter}>{noOfProducts}</div>
              </div>
            </Link>
          </div>
        ) : (
          <div className={styles.buttonsContainer}>
            <Link href="/login">
              <button className={styles.button} title="Login to your account">
                Login
              </button>
            </Link>
            <Link href="/signup">
              <button className={styles.button} title="Sign up">
                Sign up
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
