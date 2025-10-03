import { Variants } from "framer-motion";

// Page transition variants
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
};

// Staggered list variants
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

// Hover animation for cards
export const cardHover: Variants = {
  rest: { 
    scale: 1,
    y: 0,
    transition: { duration: 0.2, type: "tween" }
  },
  hover: { 
    scale: 1.02, 
    y: -5,
    transition: { duration: 0.2, type: "spring", stiffness: 300 }
  }
};

// Button hover and tap animations
export const buttonAnimation: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 }
};

// Loading skeleton animation
export const skeletonAnimation: Variants = {
  initial: { opacity: 0.5 },
  animate: { 
    opacity: [0.5, 1, 0.5],
    transition: { duration: 1.5, repeat: Infinity }
  }
};