import { Link } from "react-router-dom";
import styles from "./ProductCart.module.scss";
import { ProductCartProps } from "./ProductCart.props";

function ProductCart(props: ProductCartProps) {
  return (
    <Link to={"/"} className={styles.link}>
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
          <button className={styles.card__backet}>
            <img src="/public/cart-button.svg" alt="img" />
          </button>
          <div className={styles.card__rating}>
            {props.rating}&nbsp;
            <img src="/public/raiting.svg" alt="rating" />
          </div>
        </div>
        <div className={styles.card__footer}>
          <div className={styles.card__title}>
            {props.title}
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
