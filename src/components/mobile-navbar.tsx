"use client";

import Link from "next/link";
import { AnimatePresence, MotionConfig, motion, useCycle } from "framer-motion";
import { ContrastIcon, Globe, Search, Smile } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { useEffect } from "react";

const MobileNavbar = () => {
  const [mobileNav, toggleMobile] = useCycle(false, true);

  useEffect(() => {
    if (mobileNav) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [mobileNav]);

  const menuItems = [
    {
      label: "Explore",
      href: "/",
      icon: Globe,
    },
    {
      label: "Search",
      href: "/search",
      icon: Search,
    },
    {
      label: "Profile",
      href: "/profile",
      icon: Smile,
    },
  ];

  return (
    <nav className="sticky inset-0 z-50 h-full overflow-y-hidden lg:hidden">
      <div className="bg-black px-5 py-3">
        {/* NAV */}
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center gap-x-1">
            <ContrastIcon size={24} color="#fff" />
            <h1 className="text-xs text-white">EXPOSURE</h1>
          </div>

          <div>
            <AnimatePresence>
              <motion.button
                onClick={() => toggleMobile()}
                animate={mobileNav ? "open" : "closed"}
                className="flex flex-col space-y-1.5 text-white"
                aria-label="Toggle Menu"
              >
                <motion.span
                  variants={{
                    closed: {
                      rotate: 0,
                      transition: {
                        when: "beforeChildren",
                        type: "spring",
                        bounce: 0,
                      },
                    },
                    open: {
                      rotate: 45,
                      y: 3.5,
                      transition: {
                        when: "beforeChildren",
                        type: "spring",
                        bounce: 0,
                      },
                    },
                  }}
                  className="block h-px w-5 bg-white"
                ></motion.span>
                <motion.span
                  variants={{
                    closed: {
                      rotate: 0,
                      transition: {
                        when: "beforeChildren",
                        type: "spring",
                        bounce: 0,
                      },
                    },
                    open: {
                      rotate: -45,
                      y: -3.5,
                      transition: {
                        when: "beforeChildren",
                        type: "spring",
                        bounce: 0,
                      },
                    },
                  }}
                  className="block h-px w-5 bg-white"
                ></motion.span>
              </motion.button>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* MENU */}
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
                  x: "0%",
                  opacity: 1,
                  transition: {
                    when: "beforeChildren",
                    type: "spring",
                    bounce: 0,
                  },
                },

                closed: {
                  x: "-110%",
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
              touch-none
              className="h-full touch-none overflow-hidden bg-black px-5 py-10"
            >
              <motion.div
                variants={{
                  open: {
                    y: "0%",
                    opacity: 1,
                  },
                  closed: {
                    y: "25%",
                    opacity: 0,
                  },
                }}
              >
                {menuItems.map((item) => (
                  <Link
                    className="flex items-center gap-x-3 pb-10 text-3xl font-semibold tracking-widest text-white"
                    href={item.href}
                  >
                    {<item.icon />}
                    {item.label}
                  </Link>
                ))}

                <div className="flex w-full flex-col gap-y-4">
                  <Link
                    href="/sign-up"
                    className={buttonVariants({ variant: "secondary" })}
                  >
                    SIGN UP
                  </Link>
                  <Link
                    href="log-in"
                    className={buttonVariants({
                      variant: "outline",
                      className:
                        "bg-black text-white hover:hover:bg-secondary/80",
                    })}
                  >
                    LOG IN
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </MotionConfig>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default MobileNavbar;
