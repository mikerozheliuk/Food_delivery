import { Outlet } from "react-router-dom";
import styles from "./AuthLayout.module.scss";

export function AuthLayout() {
  return (
    <div className={styles.layout}>
      <div className={styles.layout__logo}>
        <img src="/public/logo.svg" alt="Логотип" />
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}
