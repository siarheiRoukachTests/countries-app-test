import React from "react";
import { Link } from "react-router-dom";
import { SwitchLang } from "../switchLang/SwitchLang";
import styles from "./Header.module.scss";

export const Header = () => {
  return (
    <header className={styles.header}>
      <Link className={styles.link} to="/">
        Country-App
      </Link>
      <div className={styles.controls}>
        <SwitchLang />
      </div>
    </header>
  );
};
