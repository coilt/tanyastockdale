// Function to convert text to Sentence case
function toSentenceCase(text) {
  if (!text || typeof text !== 'string') return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

// Export static links that will always work
export const links = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
  {
    title: "Blog",
    href: "/blog",
  },
];

// Keep the footer links unchanged
export const footerLinks = [
  {
    title: "Instagram",
    href: "https://instagram.com/stockdale_tanya",
    icon: "/images/instagram.svg",
  },
  {
    title: "LinkedIn",
    href: "https://linkedin.com/in/tanya-stockdale-814052256",
    icon: "/images/linkedin.svg",
  },
];
