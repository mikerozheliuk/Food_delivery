import { PREFIX } from "../../helpers/API";

import Search from "../../components/Search/Search";
import Headling from "../../components/Headling/Headling";

import { Product } from "../../interfaces/product.interface";

import styles from "./Menu.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "../../components/Spinner/Spinner";
import { MenuList } from "./MenuList/MenuList";

export function Menu() {
  const [products, setProducts] = useState<Product[]>([]);

  const [isLoading, setIsLoading] =
    useState<boolean>(false);

  const getMenu = async () => {
    try {
      setIsLoading(true);

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
      <div className={styles.menu_list}>
        {!isLoading && <MenuList products={products} />}
        {isLoading && <Spinner />}
      </div>
    </>
  );
}

export default Menu;
