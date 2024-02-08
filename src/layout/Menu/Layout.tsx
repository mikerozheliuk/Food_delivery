import { NavLink, Outlet } from "react-router-dom";

import cn from "classnames";

import styles from "./Layout.module.scss";
import Button from "../../components/ Button/Button";

export function Layout() {
  return (
    <div className={styles.layout}>
      <div className={styles.layout__sidebar}>
        <div className={styles.wrapper}>
          <div className={styles.user}>
            <img src="/public/user.png" alt="image" />
            <div className={styles.user__name}>
              Mike Rozh
            </div>
            <div className={styles.user__mail}>
              rozh@gmail.com
            </div>
          </div>

          <div className={styles.menu}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                cn(styles.menu__link, {
                  [styles.active]: isActive,
                })
              }
            >
              <img
                src="/public/menu-icon.svg"
                alt="image"
              />
              Menu
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                cn(styles.menu__link, {
                  [styles.active]: isActive,
                })
              }
            >
              <img
                src="/public/cart-icon.svg"
                alt="image"
              />
              Basket
            </NavLink>
          </div>
        </div>

        <Button className={styles.exit}>
          <img src="/public/exit-icon.svg" alt="image" />
          Exit
        </Button>
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}
