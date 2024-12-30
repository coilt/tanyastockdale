"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "./Button";
import styles from "./style.module.scss";
import Nav from "./Nav";

const menu = {
    open: {
      y: "0%",
      opacity: 1,
      width: "100vw",
    maxWidth: "100vw",
      height: "100vh",
      transition: {
        duration: 0.75,
        type: "tween",
        ease: [0.76, 0, 0.24, 1],
      },
    },
    closed: {
      y: "100%",
      opacity: 1,
      width: "100vw",
    maxWidth: "100vw",
      height: "100vh",
      transition: {
        duration: 0.75,
        type: "tween",
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };
  

export default function MobileMenu() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={styles.header}>
      <motion.div
        className={styles.menu}
        variants={menu}
        animate={isActive ? "open" : "closed"}
        initial="closed"
      >
        <AnimatePresence>{isActive && <Nav />}</AnimatePresence>
      </motion.div>
      <Button
        isActive={isActive}
        toggleMenu={() => {
          setIsActive(!isActive);
        }}
      />
    </div>
  );
}
