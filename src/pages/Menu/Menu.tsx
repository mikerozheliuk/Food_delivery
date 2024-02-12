import { PREFIX } from "../../helpers/API";

import Search from "../../components/Search/Search";
import Headling from "../../components/Headling/Headling";
import ProductCart from "../../components/ProductCart/ProductCart";

import { Product } from "../../interfaces/product.interface";

import styles from "./Menu.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "../../components/Spinner/Spinner";

export function Menu() {
  const [products, setProducts] = useState<Product[]>([]);

  const [isLoading, setIsLoading] =
    useState<boolean>(false);

  const getMenu = async () => {
    try {
      setIsLoading(true);
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 2000);
      });

      const { data } = await axios.get<Product[]>(
        `${PREFIX}/products`
      );

      setProducts(data);

      setIsLoading(false);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
      return;
    }
  };

  useEffect(() => {
    getMenu();
  }, []);

  return (
    <>
      <div className={styles.head}>
        <Headling>Menu</Headling>
        <Search placeholder="Введіть страву чи склад" />
      </div>
      <div className={styles.menu}>
        {!isLoading &&
          products.map((p) => (
            <ProductCart
              key={p.id}
              id={p.id}
              name={p.name}
              description={p.ingredients.join(", ")}
              rating={p.rating}
              price={p.price}
              image={p.image}
            />
          ))}
        {isLoading && <Spinner />}
      </div>
    </>
  );
}
