import {
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import cn from "classnames";

import Button from "../../components/ Button/Button";

import { AppDispath, RootState } from "../../store/store";
import {
  getProfile,
  userActions,
} from "../../store/user.slice";

import styles from "./Layout.module.scss";

import { useEffect } from "react";

export function Layout() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispath>();

  const profile = useSelector(
    (s: RootState) => s.user.profile
  );

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const logout = () => {
    dispatch(userActions.logout());
    navigate("/auth/login");
  };

  return (
    <div className={styles.layout}>
      <div className={styles.layout__sidebar}>
        <div className={styles.wrapper}>
          <div className={styles.user}>
            <img src="/public/user.png" alt="image" />
            <div className={styles.user__name}>
              {profile?.name}
            </div>
            <div className={styles.user__mail}>
              {profile?.email}
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

        <Button className={styles.exit} onClick={logout}>
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
