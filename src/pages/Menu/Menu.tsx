import Headling from "../../components/Headling/Headling";
import Search from "../../components/Search/Search";

import styles from "./Menu.module.scss";

export function Menu() {
  return (
    <>
      <div className={styles.head}>
        <Headling>Menu</Headling>
        <Search placeholder="Введіть страву чи склад" />
      </div>
    </>
  );
}
