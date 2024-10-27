import { motion } from "framer-motion";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const variants = {
  hidden: { opacity: 0, y: -5 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 1 },
};

const AnimatedLayout = ({ children }: Props): React.JSX.Element => {
  return (
    <motion.div
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.25, type: "easeInOut" }}
      className="flex flex-1 w-full"
    >
      {children}
    </motion.div>
  );
};

export default AnimatedLayout;
