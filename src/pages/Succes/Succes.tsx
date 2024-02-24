import { useNavigate } from "react-router-dom";

import Button from "../../components/ Button/Button";

import styles from "./Succes.module.scss";

export function Success() {
  const navigate = useNavigate();

  return (
    <div className={styles.success}>
      <img src="/public/pizza.png" alt=" піца" />
      <div className={styles.text}>Ваш заказ успішно оформлений!</div>
      <Button appearence="big" onClick={() => navigate("/")}>
        Зробити новий
      </Button>
    </div>
  );
}
