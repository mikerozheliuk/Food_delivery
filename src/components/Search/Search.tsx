import cn from "classnames";
import { forwardRef } from "react";
import { SearchProps } from "./Search.props";

import styles from "./Search.module.scss";

const Search = forwardRef<HTMLInputElement, SearchProps>(
  function Input(
    { className, isValid = true, ...props },
    ref
  ) {
    return (
      <div className={styles.inputWrapper}>
        <input
          {...props}
          ref={ref}
          className={cn(className, styles["input"], {
            [styles["invalid"]]: isValid,
          })}
          {...props}
        />
        <img
          className={styles.inputIcon}
          src="/public/search.svg"
          alt="search"
        />
      </div>
    );
  }
);

export default Search;
