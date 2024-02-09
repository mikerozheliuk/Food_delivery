import Headling from "../../components/Headling/Headling";
import ProductCart from "../../components/ProductCart/ProductCart";
import Search from "../../components/Search/Search";

import styles from "./Menu.module.scss";

export function Menu() {
  return (
    <>
      <div className={styles.head}>
        <Headling>Menu</Headling>
        <Search placeholder="Введіть страву чи склад" />
      </div>
      <ProductCart
        id={1}
        title="Насолода"
        description="Салями, руккола, помидоры, оливки"
        rating={4.5}
        price={300}
        image="/public/image 80.png"
      />
    </>
  );
}
