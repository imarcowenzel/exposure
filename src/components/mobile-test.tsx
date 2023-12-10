"use client";

import { motion, useCycle, AnimatePresence, MotionConfig } from "framer-motion";
import { ContrastIcon } from "lucide-react";
import Link from "next/link";

const MobileTest = () => {
  const [mobileNav, toggleMobile] = useCycle(false, true);

  return (
    <nav className="relative inset-x-0 top-0 z-10 flex h-16 w-full flex-col bg-black lg:hidden">

      <div className="container mx-auto flex h-full items-center justify-between px-4">
        <div className="flex items-center justify-center gap-x-1">
          <ContrastIcon size={24} color="#fff" />
          <h1 className="text-xs text-white">EXPOSURE</h1>
        </div>

        <div className="relative z-10">
          <motion.button
            onClick={() => toggleMobile()}
            animate={mobileNav ? "open" : "closed"}
            className="flex flex-col space-y-1"
          >
            <motion.span
              variants={{
                closed: { rotate: 0 },
                open: { rotate: 45, y: 5 },
              }}
              className="block h-px w-5 bg-white"
            ></motion.span>
            <motion.span
              variants={{
                closed: { rotate: 0 },
                open: { rotate: -45, y: -5 },
              }}
              className="block h-px w-5 bg-white"
            ></motion.span>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {mobileNav && (
          <MotionConfig
            transition={{
              type: "spring",
              bounce: 0,
            }}
          >
            <motion.div
              variants={{
                open: {
                  y: "0%",
                  opacity: 1,
                  transition: {
                    when: "beforeChildren",
                    type: "spring",
                    bounce: 0,
                  },
                },
                closed: {
                  y: "100%",
                  opacity: 0,
                  transition: {
                    when: "afterChildren",
                    type: "spring",
                    bounce: 0,
                  },
                },
              }}
              initial="closed"
              animate="open"
              exit="closed"
              className="mx-auto flex h-full w-full flex-col justify-center space-y-10 bg-blue-500 p-6"
            >
              <motion.div
                variants={{
                  open: { y: "0%", opacity: 1 },
                  closed: { y: "100%", opacity: 0 },
                }}
              >
                <ul className="space-y-5 text-white">
                  <li>
                    <Link href="#" className="text-4xl font-bold">
                      Link #1
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-4xl font-bold">
                      Link #2
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-4xl font-bold">
                      Link #3
                    </Link>
                  </li>
                </ul>
              </motion.div>

              <motion.div className="h-px w-full bg-white" />

              <motion.div className="bg-blue-500">
                <ul className="flex items-center justify-center gap-x-5">
                  <li>
                    <div className="h-10 w-10 rounded-lg bg-gray-300"></div>
                  </li>
                  <li>
                    <div className="h-10 w-10 rounded-lg bg-gray-300"></div>
                  </li>
                  <li>
                    <div className="h-10 w-10 rounded-lg bg-gray-300"></div>
                  </li>
                </ul>
              </motion.div>
            </motion.div>
          </MotionConfig>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default MobileTest;
