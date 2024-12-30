export const perspective = {
  initial: {
    opacity: 0,
    translateY: 60,
  },
  enter: (i) => ({
    opacity: 1,
    translateY: 0,
    transition: {
      duration: 0.65,
      delay: 0.5 + (i * 0.1),
      ease: [.215,.61,.355,1],
      opacity: { duration: 0.75, delay: 0.6 }
    }
  }),
  exit: {
    opacity: 0,
    transition: { duration: 0.5, type: "linear", ease: [0.76, 0, 0.24, 1] },
  },
};

export const slideIn = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.75 + i * 0.1,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
  exit: {
    opacity: 0,
    transition: { duration: 0.5, type: "tween", ease: "easeInOut" },
  },
};
