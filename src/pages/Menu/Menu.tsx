import axios from "axios";

import { ChangeEvent, useEffect, useState } from "react";

import { PREFIX } from "../../helpers/API";

import Search from "../../components/Search/Search";
import Headling from "../../components/Headling/Headling";
import { Spinner } from "../../components/Spinner/Spinner";

import { Product } from "../../interfaces/product.interface";

import { MenuList } from "./MenuList/MenuList";

import styles from "./Menu.module.scss";

export function Menu() {
  const [products, setProducts] = useState<Product[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [filter, setFilter] = useState<string>();

  useEffect(() => {
    getMenu(filter);
  }, [filter]);

  const getMenu = async (name?: string) => {
    try {
      setIsLoading(true);

      const { data } = await axios.get<Product[]>(`${PREFIX}/products`, {
        params: {
          name,
        },
      });

      setProducts(data);

      setIsLoading(false);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
      return;
    }
  };

  const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  return (
    <>
      <div className={styles.head}>
        <Headling>Menu</Headling>
        <Search placeholder="Введіть страву чи склад" onChange={updateFilter} />
      </div>
      <div className={styles.menu_list}>
        {!isLoading && products.length > 0 && <MenuList products={products} />}
        {isLoading && <Spinner />}
        {!isLoading && products.length === 0 && <>Не знайдено блюд по запиту</>}
      </div>
    </>
  );
}

export default Menu;
