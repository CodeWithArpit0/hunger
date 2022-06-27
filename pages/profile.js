import styles from "../styles/profile.module.css";
import avatarImg from "../public/images/avatar.png";

export default function Profile() {
  return (
    <div className={styles.container}>
      <div className={styles.profileWrapper}>
        <div className={styles.profileHeader}>
          <div className={styles.userDetailsContainer}>
            <div className={styles.userMain}>
              <div className={styles.avatar}></div>
              <h1>Arpit Saxena</h1>
            </div>
            <div className={styles.userDetails}>
              <div className={styles.editProfileBtn}>
                <button>Edit profile</button>
              </div>
              <div className={styles.userFav}>
                <div className={styles.favorite}>
                  <button>
                    <h1>0</h1>
                    Favorites
                  </button>
                </div>
                <div className={styles.favorite}>
                  <button>
                    <h1>0</h1>
                    Favorites
                  </button>
                </div>
                <div className={styles.favorite}>
                  <button>
                    <h1>0</h1>
                    Favorites
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
