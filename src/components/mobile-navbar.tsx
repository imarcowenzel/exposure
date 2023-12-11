"use client";

import { AnimatePresence, MotionConfig, motion, useCycle } from "framer-motion";
import { ContrastIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { buttonVariants } from "@/components/ui/button";
import { menuItems } from "@/config";

const MobileNavbar = () => {
  const [isOpen, toggleMenu] = useCycle(false, true);
  const pathname = usePathname();

  // Whenever we click an item in the menu and navigate away, we want to close the menu.
  useEffect(() => {
    toggleMenu(0);
  }, [pathname]);

  // When we click the path we are currently on, we still want the mobile menu to close,
  // however we cant rely on the pathname for it because that won't change (we're already there)
  const closeOnCurrent = (href: string) => {
    if (pathname === href) {
      toggleMenu(0);
    }
  };

  // Remove second scrollbar when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  return (
    <nav className="sticky inset-0 h-full overflow-y-hidden md:hidden">
      <div className="bg-black px-5 py-3">
        {/* Nav */}
        <div className="flex items-center justify-between">
          {/* Nav Left */}
          <div>
            <Link href="/" className="flex items-center gap-x-1 text-white">
              <ContrastIcon size={24} />
              <h1 className="text-xs leading-loose">EXPOSURE</h1>
            </Link>
          </div>

          {/* Nav Right */}
          <div>
            <motion.button
              onClick={() => toggleMenu()}
              animate={isOpen ? "open" : "closed"}
              className="flex flex-col space-y-1.5 text-white"
              aria-label="Toggle Menu"
            >
              <motion.span
                variants={{
                  closed: {
                    rotate: 0,
                  },
                  open: {
                    rotate: 45,
                    y: 3.5,
                  },
                }}
                className="block h-px w-5 bg-white"
              ></motion.span>
              <motion.span
                variants={{
                  closed: {
                    rotate: 0,
                  },
                  open: {
                    rotate: -45,
                    y: -3.5,
                  },
                }}
                className="block h-px w-5 bg-white"
              ></motion.span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Menu */}
      <AnimatePresence>
        {isOpen && (
          <MotionConfig
            transition={{
              type: "just",
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
                    type: "just",
                    bounce: 0,
                  },
                },

                closed: {
                  x: "-110%",
                  opacity: 0,
                  transition: {
                    when: "afterChildren",
                    type: "just",
                    bounce: 0,
                  },
                },
              }}
              initial="closed"
              animate="open"
              exit="closed"
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
                {menuItems.map((item, i) => (
                  <Link
                    key={i}
                    onClick={() => closeOnCurrent(item.href)}
                    href={item.href}
                    className="flex items-center gap-x-3 pb-10 text-3xl font-semibold tracking-widest text-white"
                  >
                    {<item.icon />}
                    {item.label}
                  </Link>
                ))}

                <div className="flex w-full flex-col gap-y-4">
                  <Link
                    href="/sign-up"
                    onClick={() => closeOnCurrent("/sign-up")}
                    className={buttonVariants({ variant: "secondary" })}
                  >
                    SIGN UP
                  </Link>
                  <Link
                    href="/log-in"
                    onClick={() => closeOnCurrent("/log-in")}
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
