"use client";

import { useState, useEffect } from "react";
import Button from "./Button";
import styles from "./style.module.scss";
import Nav from "./Nav";

export default function MobileMenu({ menuLinks }) {
  const [isActive, setIsActive] = useState(false);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    // Parse the serialized links prop
    if (menuLinks) {
      try {
        const parsedLinks = JSON.parse(menuLinks);
        setLinks(parsedLinks);
      } catch (error) {
        console.error("Error parsing menu links:", error);
      }
    }
  }, [menuLinks]);

  return (
    <div className={styles.header}>
      <div
        className={`${styles.menu} ${isActive ? styles.open : styles.closed}`}
      >
        {isActive && <Nav customLinks={links} />}
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
