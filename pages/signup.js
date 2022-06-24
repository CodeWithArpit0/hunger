import { useRef, useState } from "react";
import styles from "../styles/Signup.module.css";
import Link from "next/link";
import axios from "axios";
import Router from "next/router";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { ImCross } from "react-icons/im";

export default function Signup() {
  // ** System States
  const [togglePassword, setTogglerPassword] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [error, setError] = useState({
    error: false,
    msg: "",
  });

  const [User, setUser] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  // ** Signup Button reference
  const signupRef = useRef();
  // ** Checkbox reference
  const termsInputRef = useRef();
  // ** Input fields references
  const fullNameRef = useRef();
  const emailRef = useRef();
  const passwordInputRef = useRef();

  // ** System Functions
  function handlePassword() {
    const passwordInput = passwordInputRef.current;
    if (togglePassword) {
      passwordInput.type = "password";
      setTogglerPassword(false);
    } else {
      passwordInput.type = "text";
      setTogglerPassword(true);
    }
  }
  const activeSignupBtnStyle = {
    backgroundColor: "#d1411e",
    color: "#fff",
  };
  const inactiveSignupBtnStyle = {
    backgroundColor: "#e2e2e2",
    color: "rgb(189, 189, 189)",
  };
  const [signupBtnStyle, setSignupBtnStyle] = useState(inactiveSignupBtnStyle);

  function handleTermsAndConditions() {
    if (termsInputRef.current.checked) {
      setSignupBtnStyle(activeSignupBtnStyle);
      signupRef.current.disabled = false;
    } else {
      setSignupBtnStyle(inactiveSignupBtnStyle);
      signupRef.current.disabled = true;
    }
  }

  function handleInput(e) {
    setUser({ ...User, [e.target.name]: e.target.value });
  }

  async function handleSignup() {
    if (
      fullNameRef.current.value === "" ||
      emailRef.current.value === "" ||
      passwordInputRef.current.value === ""
    ) {
      setError({ error: true, msg: "Please fill all the required fields" });
    } else {
      setIsModelOpen(true);
      try {
        const res = await axios.post("http://localhost:3000/api/signup", User);
        if (res.status === 201) {
          setIsModelOpen(false);
          Router.push("/login");
        }
      } catch (err) {
        setIsModelOpen(false);
        setError({ error: true, msg: err.response.data });
      }
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.heading}>Sign Up</h1>
        <div className={styles.item} style={{marginTop: 10 + "px"}}>
          <label htmlFor="fullname" className={styles.label}>
            Full Name
          </label>
          <input
            type="text"
            className={styles.input}
            placeholder="Arpit Saxena"
            id="fullname"
            name="fullname"
            ref={fullNameRef}
            onChange={(e) => handleInput(e)}
          />
        </div>
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
            ref={emailRef}
            onChange={(e) => handleInput(e)}
          />
        </div>
        <div className={styles.item}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <div className={styles.passInput}>
            <input
              type="password"
              className={styles.input}
              placeholder="Password"
              id="password"
              name="password"
              ref={passwordInputRef}
              onChange={(e) => handleInput(e)}
            />
            {togglePassword ? (
              <BsFillEyeFill
                className={styles.eyeIcon}
                title="Show Password"
                onClick={handlePassword}
              />
            ) : (
              <BsFillEyeSlashFill
                className={styles.eyeIcon}
                title="Hide Password"
                onClick={handlePassword}
              />
            )}
          </div>
        </div>
        <div className={styles.preDeclartionContainer}>
          <input
            type="checkbox"
            className={styles.checkbox}
            ref={termsInputRef}
            onChange={handleTermsAndConditions}
          />
          <p className={styles.preDeclartionPara}>
            I agree to Hunger
            <Link href="/conditions" passHref>
              <span className={styles.preDeclartions}>Terms of Servic</span>
            </Link>
            ,&nbsp;
            <Link href="/privacy" passHref>
              <span className={styles.preDeclartions}>Privacy Policy</span>
            </Link>
            &nbsp;and&nbsp;
            <Link href="/policies" passHref>
              <span className={styles.preDeclartions}>Content Policies</span>
            </Link>
          </p>
        </div>

        <div className={styles.item}>
          <button
            type="submit"
            style={signupBtnStyle}
            className={styles.signupBtn}
            ref={signupRef}
            onClick={handleSignup}
          >
            Sign Up
          </button>

          {isModelOpen && (
            <div className={styles.signupModel}>
              <div className={styles.modelWrapper}>
                <h1 className={styles.loginHeading}>Signing you in ...</h1>
              </div>
            </div>
          )}

          <p className={styles.loginRedirect}>
            Already have an account?{" "}
            <Link href="/login" passHref>
              <span className={styles.loginPara}>Login</span>
            </Link>
          </p>
        </div>

        {error.error && (
          <div className={styles.errorBox}>
            <p className={styles.error}>{error.msg}</p>
            <ImCross
              className={styles.errorCloseIcon}
              title="Close error"
              onClick={() => setError(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
