import { Variants } from "framer-motion";

// Page transitions
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

// Form element animations
export const formItemVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

// Logo animation
export const logoVariants: Variants = {
  initial: { scale: 0.8, rotate: -10 },
  animate: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
    },
  },
  hover: {
    scale: 1.1,
    rotate: 3,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
};

// Primary button hover animation
export const buttonVariants: Variants = {
  initial: { 
    scale: 1,
    backgroundColor: "rgb(0, 0, 0)",
  },
  hover: {
    scale: 1.02,
    backgroundColor: "rgb(17, 17, 17)",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
      backgroundColor: {
        type: "tween",
        duration: 0.2,
      },
      boxShadow: {
        type: "tween",
        duration: 0.2,
      },
    },
  },
  tap: {
    scale: 0.98,
    backgroundColor: "rgb(0, 0, 0)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
};

// Social button hover animation
export const socialButtonVariants: Variants = {
  initial: { 
    scale: 1,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    y: 0,
  },
  hover: {
    scale: 1.05,
    backgroundColor: "rgba(255, 255, 255, 1)",
    y: -2,
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
      backgroundColor: {
        type: "tween",
        duration: 0.2,
      },
      boxShadow: {
        type: "tween",
        duration: 0.2,
      },
    },
  },
  tap: {
    scale: 0.95,
    y: 0,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
};

// Link button hover animation
export const linkButtonVariants: Variants = {
  initial: {
    scale: 1,
    color: "rgb(37, 99, 235)",
  },
  hover: {
    scale: 1.05,
    color: "rgb(29, 78, 216)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
      color: {
        type: "tween",
        duration: 0.2,
      },
    },
  },
  tap: {
    scale: 0.95,
  },
};

// Input field focus animation
export const inputVariants: Variants = {
  initial: { y: 0 },
  focus: {
    y: -2,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30,
    },
  },
};

// Staggered container animation
export const staggerContainerVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};