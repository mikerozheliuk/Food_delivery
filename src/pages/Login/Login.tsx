import { FormEvent } from "react";
import { Link } from "react-router-dom";

import Input from "../../components/Input/Input";
import Button from "../../components/ Button/Button";
import Headling from "../../components/Headling/Headling";

import styles from "./Login.module.scss";

export function Login() {
  const submit = (e: FormEvent) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <div className={styles.login} onSubmit={submit}>
      <Headling>Вход</Headling>
      <form className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="email">Ваш email</label>
          <Input id="email" placeholder="Email" />
        </div>
        <div className={styles.field}>
          <label htmlFor="password">Ваш пароль</label>
          <Input
            id="password"
            type="password"
            placeholder="Пароль"
          />
        </div>
        <Button appearence="big">Вход</Button>
      </form>
      <div className={styles.links}>
        <div>Нема аккаунта?</div>
        <Link to="/auth/register">Зарегистрироваться</Link>
      </div>
    </div>
  );
}
