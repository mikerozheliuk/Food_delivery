import { Link } from "react-router-dom";
import styles from "./ProductCart.module.scss";
import { ProductCartProps } from "./ProductCart.props";
import { AppDispath } from "../../store/store";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart.slice";
import { MouseEvent } from "react";

function ProductCart(props: ProductCartProps) {
  const dispatch = useDispatch<AppDispath>();

  const add = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(cartActions.add(props.id));
  };

  return (
    <Link
      to={`/product/${props.id}`}
      className={styles.link}
    >
      <div className={styles.card}>
        <div
          className={styles.card__head}
          style={{
            backgroundImage: `url("${props.image}")`,
          }}
        >
          <div className={styles.card__price}>
            {props.price}&nbsp;
            <span className={styles.card__currency}>$</span>
          </div>
          <button
            className={styles.card__backet}
            onClick={add}
          >
            <img src="/public/cart-button.svg" alt="img" />
          </button>
          <div className={styles.card__rating}>
            {props.rating}&nbsp;
            <img src="/public/raiting.svg" alt="rating" />
          </div>
        </div>
        <div className={styles.card__footer}>
          <div className={styles.card__title}>
            {props.name}
          </div>

          <div className={styles.card__description}>
            {props.description}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCart;
