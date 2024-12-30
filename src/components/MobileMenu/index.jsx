"use client";
import { useState } from "react";
import Button from "./Button";
import styles from "./style.module.scss";
import Nav from "./Nav";

  
export default function MobileMenu() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={styles.header}>
      <div
        className={`${styles.menu} ${isActive ? styles.open : styles.closed}`}
      >
        {isActive && <Nav />}
      </div>
      <Button
        isActive={isActive}
        toggleMenu={() => {
          setIsActive(!isActive);
        }}
      />
    </div>
  );
}
