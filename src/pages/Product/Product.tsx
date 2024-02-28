import { Suspense, useCallback } from "react";
import { Await, useLoaderData, useNavigate, useParams } from "react-router-dom";

import { Product } from "../../interfaces/product.interface";

import { Spinner } from "../../components/Spinner/Spinner";
import Headling from "../../components/Headling/Headling";

import styles from "./Product.module.scss";
import Button from "../../components/ Button/Button";
import { cartActions } from "../../store/cart.slice";
import { useDispatch } from "react-redux";
import { AppDispath } from "../../store/store";

export function Product() {
  const data = useLoaderData() as { data: Product };

  const dispatch = useDispatch<AppDispath>();

  const { id } = useParams();

  const add = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(cartActions.add(parseInt(String(id), 10)));
  };

  const navigate = useNavigate();

  const goToBack = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <>
      <Suspense fallback={<Spinner />}>
        <div className={styles.head}>
          <Await resolve={data.data}>
            {({ data }: { data: Product }) => (
              <Headling className={styles.title}>
                <img
                  className={styles.svg}
                  src="/public/icon_left.svg"
                  alt="image"
                  onClick={goToBack}
                />
                {data.name}
              </Headling>
            )}
          </Await>
          <Button className={styles.headButton} onClick={add} appearence="small">
            <img src="/public/cart-icon_white.svg" alt="image" />В корзину
          </Button>
        </div>

        <Await resolve={data.data}>
          {({ data }: { data: Product }) => (
            <div className={styles.cart}>
              <div
                className={styles.cart__image}
                style={{
                  backgroundImage: `url("${data.image}")`,
                }}
              ></div>

              <div className={styles.cart__content}>
                <div className={styles.cart__price}>
                  <div className={styles.cart__name}>Ціна</div>
                  <div>
                    {data.price}&nbsp;
                    <span className={styles.cart__currency}>$</span>
                  </div>
                </div>
                <div className={styles.cart__rating}>
                  <div className={styles.cart__name}>Рейтинг</div>
                  <div>
                    {data.rating}&nbsp;
                    <img src="/public/raiting.svg" alt="rating" />
                  </div>
                </div>
                <div className={styles.cart__wrap_desc}>
                  <div className={styles.cart__desc_name}>Склад:</div>
                  <div className={styles.cart__description}>
                    {data.ingredients.join(", ")}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Await>
      </Suspense>
    </>
  );
}
