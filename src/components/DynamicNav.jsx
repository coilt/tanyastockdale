import { useEffect, useState } from 'react';
import styles from "./Nav/style.module.scss";
import { motion } from "framer-motion";
import { footerLinks } from "./Nav/data";
import { slideIn } from "./Nav/anim";

// Function to convert text to Sentence case
function toSentenceCase(text) {
  if (!text || typeof text !== 'string') return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export default function DynamicNav() {
  const [links, setLinks] = useState([
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Reach out", href: "/contact" },
    { title: "Blog", href: "/blog" }
  ]);

  useEffect(() => {
    // Fetch pages from the server
    async function fetchPages() {
      try {
        const response = await fetch('/api/pages');
        if (!response.ok) {
          throw new Error(`Failed to fetch pages: ${response.status}`);
        }
        
        const pages = await response.json();
        
        if (pages && pages.length > 0) {
          // Format pages for navigation
          const dynamicLinks = pages.map(page => ({
            title: toSentenceCase(page.title || "Untitled"),
            href: `/${page.slug || ""}`
          }));
          
          // Create a new array with Home (if needed) and Blog
          const newLinks = [
            // Include Home if not already in the dynamic links
            ...(!dynamicLinks.some(link => link.href === "/") ? [{ title: "Home", href: "/" }] : []),
            ...dynamicLinks,
            // Always include Blog
            { title: "Blog", href: "/blog" }
          ];
          
          setLinks(newLinks);
        }
      } catch (error) {
        console.error("Error fetching pages:", error);
        // Keep using the default links if there's an error
      }
    }
    
    fetchPages();
  }, []);

  return (
    <div className={styles.nav}>
      <div className={styles.body}>
        {links.map((link, i) => {
          const { title, href } = link;
          return (
            <div key={`b_${i}`} className={styles.linkContainer} style={{"--index": i}}>
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
