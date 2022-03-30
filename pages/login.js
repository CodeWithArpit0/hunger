import { useState, useRef } from "react";
import styles from "../styles/Login.module.css";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import Link from "next/Link";
import axios from "axios";
import Router from "next/router";
import { useDispatch } from "react-redux";
import { initializeUser } from "../redux/userSlice";
import { initializeCart, updateCartCount } from "../redux/cartSlice";
import { ImCross } from "react-icons/im";

export default function Login() {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isErrorOccure, setIsErrorOccure] = useState(false);
  const [error, setError] = useState("");
  const [togglePassword, setTogglerPassword] = useState(false);
  const [UserDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  // ** Input fields references
  const emailRef = useRef();
  const passwordRef = useRef();

  function handleInput(e) {
    setUserDetails({ ...UserDetails, [e.target.name]: e.target.value });
  }

  async function handleLogin() {
    if (emailRef.current.value === "" || passwordRef.current.value === "") {
      setError("Please fill all the required fields!");
      setIsErrorOccure(true);
    } else {
      setIsModelOpen(true);

      try {
        const res = await axios.post(
          "http://localhost:3000/api/login",
          UserDetails
        );

        const User = res.data;
        const noOfProducts = User.cart.length;
        const cart = User.cart;
        const cartTotal = User.cartTotal;

        dispatch(initializeUser({ currentUser: User, isLoggedIn: true }));
        dispatch(
          updateCartCount({ noOfProducts: noOfProducts, cartTotal: cartTotal })
        );
        dispatch(initializeCart(cart));

        Router.push("/");
        setIsModelOpen(false);
      } catch (err) {
        setIsModelOpen(false);
        setError("Invalid Email or Password!");
        setIsErrorOccure(true);
      }
    }
  }

  function handlePassword() {
    const passwordInput = document.getElementById("passInput");
    if (togglePassword) {
      passwordInput.type = "password";
      setTogglerPassword(false);
    } else {
      passwordInput.type = "text";
      setTogglerPassword(true);
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.heading}>Login</h1>
        <div className={styles.item}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="text"
            className={styles.input}
            placeholder="yourname@gmail.com"
            id="email"
            name="email"
            onChange={handleInput}
            ref={emailRef}
          />
        </div>
        <div className={styles.item}>
          <label htmlFor="email" className={styles.label}>
            Password
          </label>
          <div className={styles.passInput}>
            <input
              type="password"
              placeholder="Password"
              className={styles.input}
              id="passInput"
              name="password"
              onChange={handleInput}
              ref={passwordRef}
            />
            {togglePassword ? (
              <BsFillEyeSlashFill
                className={styles.eyeIcon}
                title="Hide Password"
                onClick={handlePassword}
              />
            ) : (
              <BsFillEyeFill
                className={styles.eyeIcon}
                title="Show Password"
                onClick={handlePassword}
              />
            )}
          </div>
        </div>

        <div className={styles.item}>
          <button className={styles.loginBtn} onClick={(e) => handleLogin(e)}>
            Login
          </button>
          {isModelOpen && (
            <div className={styles.loginModel}>
              <div className={styles.modelWrapper}>
                <h1 className={styles.loginHeading}>Logging you in ...</h1>
              </div>
            </div>
          )}
        </div>

        <div className={styles.item}>
          <p className={styles.loginRedirect}>
            New to Hunger?{" "}
            <Link href="/signup" passHref>
              <span className={styles.loginPara}> Create account</span>
            </Link>
          </p>
        </div>

        {isErrorOccure && (
          <div className={styles.errorBox}>
            <p className={styles.error}>{error}</p>
            <ImCross
              className={styles.errorCloseIcon}
              title="Close error"
              onClick={() => setIsErrorOccure(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
