import styles from "./style.module.scss";
import { motion } from "framer-motion";
import { links, footerLinks } from "./data";
import { slideIn } from "./anim";
 

export default function index() {
  return (
<div className={styles.nav}>
  <div className={styles.body}>
    {links.map((link, i) => {
      const { title, href } = link;
      return (
        <div key={`b_${i}`} className={styles.linkContainer}>
          <div className={styles.animatedLink}>
            <a href={href}>{title}</a>
          </div>
        </div>
      );
    })}
      </div>
      <motion.div className={styles.footer}>
        {footerLinks.map((link, i) => {
          const { title, href, icon } = link;
          return (
            <motion.a
              variants={slideIn}
              custom={i}
              initial="initial"
              animate="enter"
              exit="exit"
              key={`f_${i}`}
              href={href}
              className={styles.footerLink}
            >
             <img src={icon} alt={title} className={styles.icon} />

              <span>{title}</span>
            </motion.a>
          );
        })}
      </motion.div>
    </div>
  );
}
