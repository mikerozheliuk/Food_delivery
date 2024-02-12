import cn from "classnames";

import styles from "./Spinner.module.scss";

export const Spinner = () => (
  <div className={styles.spinnerWrapper}>
    <div className={styles.spinner}>
      <div className={cn(styles.cube, styles.cube_1)}></div>
      <div className={cn(styles.cube, styles.cube_2)}></div>
      <div className={cn(styles.cube, styles.cube_4)}></div>
      <div className={cn(styles.cube, styles.cube_3)}></div>
    </div>
  </div>
);
