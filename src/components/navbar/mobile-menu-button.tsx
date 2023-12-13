import { motion } from "framer-motion";

import {
  menuButtonBottomVariants,
  menuButtonTopVariants,
} from "@/lib/motion/variants";

type MobileMenuButtonProps = {
  toggleMenu: (i?: number | undefined) => void;
  isOpen: boolean;
};

const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({
  toggleMenu,
  isOpen,
}) => {
  return (
    <div>
      <motion.button
        onClick={() => toggleMenu()}
        animate={isOpen ? "open" : "closed"}
        className="flex flex-col space-y-1.5 text-white"
        aria-label="Toggle Menu"
      >
        <motion.span
          variants={menuButtonTopVariants}
          className="block h-px w-5 bg-white"
        ></motion.span>
        <motion.span
          variants={menuButtonBottomVariants}
          className="block h-px w-5 bg-white"
        ></motion.span>
      </motion.button>
    </div>
  );
};

export default MobileMenuButton;
