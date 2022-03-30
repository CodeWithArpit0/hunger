import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "../../styles/AdminLogin.module.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleClick() {
    try {
      await axios.post("https://hunger-alpha.vercel.app/api/admin_login", {
        username,
        password,
      });
      router.push("/admin");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>ADMIN</h1>
        <div className={styles.loginWrapper}>
          <input
            placeholder="Username"
            type="text"
            className={styles.input}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            placeholder="Password"
            type="password"
            className={styles.input}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleClick} className={styles.button}>
            Sign In
          </button>
          {error && <span className={styles.error}>Wrong Credentials</span>}
        </div>
      </div>
    </div>
  );
}
