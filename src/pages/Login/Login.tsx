import { useDispatch, useSelector } from "react-redux";
import { FormEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Input from "../../components/Input/Input";
import Button from "../../components/ Button/Button";
import Headling from "../../components/Headling/Headling";

import { AppDispath, RootState } from "../../store/store";
import { login, userActions } from "../../store/user.slice";

import styles from "./Login.module.scss";

export type LoginForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
};

export function Login() {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispath>();
  const { jwt, loginErrorMessage } = useSelector(
    (s: RootState) => s.user
  );

  useEffect(() => {
    if (jwt) {
      navigate("/");
    }
  }, [jwt, navigate]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(userActions.clearLoginError());

    const target = e.target as typeof e.target & LoginForm;
    const { email, password } = target;
    await sendLogin(email.value, password.value);
  };

  const sendLogin = async (
    email: string,
    password: string
  ) => {
    dispatch(login({ email, password }));
  };

  return (
    <div className={styles.login}>
      <Headling>Вхід</Headling>
      {loginErrorMessage && (
        <div className={styles.error}>
          {loginErrorMessage}
        </div>
      )}
      <form className={styles.form} onSubmit={submit}>
        <div className={styles.field}>
          <label htmlFor="email">Ваш email</label>
          <Input
            id="email"
            name="email"
            placeholder="Email"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="password">Ваш пароль</label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
          />
        </div>

        <Button appearence="big">Вхід</Button>
      </form>

      <div className={styles.links}>
        <div>Нема акаунта?</div>

        <Link to="/auth/register">Зарегистрироваться</Link>
      </div>
    </div>
  );
}
