import { PREFIX } from "../../helpers/API";

import Search from "../../components/Search/Search";
import Headling from "../../components/Headling/Headling";
import ProductCart from "../../components/ProductCart/ProductCart";

import { Product } from "../../interfaces/product.interface";

import styles from "./Menu.module.scss";
import { useEffect, useState } from "react";

export function Menu() {
  const [products, setProducts] = useState<Product[]>([]);
  const getMenu = async () => {
    try {
      const res = await fetch(`${PREFIX}/products`);
      if (res.ok) {
        return;
      }
      const data = (await res.json()) as Product[];
      setProducts(data);
    } catch (e) {
      console.error(e);
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
      <div>
        {products.map((p) => (
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
      </div>
    </>
  );
}
