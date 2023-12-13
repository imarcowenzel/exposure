import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { Search, Settings } from "lucide-react";
import { Session } from "next-auth";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { menuItems } from "@/config";
import {
  menuItemContentVariants,
  menuItemVariants,
} from "@/lib/motion/variants";

type MobileMenuProps = {
  isOpen: boolean;
  closeOnCurrent: (href: string) => void;
  session: Session | null;
};

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  closeOnCurrent,
  session,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <MotionConfig
          transition={{
            type: "just",
            bounce: 0,
          }}
        >
          <motion.div
            variants={menuItemVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="h-full touch-none overflow-hidden bg-black px-5 py-10"
          >
            <motion.div variants={menuItemContentVariants}>
              {menuItems.default.map((item, i) => (
                <Link
                  key={i}
                  onClick={() =>
                    closeOnCurrent(
                      item.label === "Profile"
                        ? `/profile/${session?.user._id}`
                        : item.href,
                    )
                  }
                  href={
                    item.label === "Profile"
                      ? `/profile/${session?.user._id}`
                      : item.href
                  }
                  className="flex items-center gap-x-3 pb-10 text-3xl tracking-widest text-white"
                >
                  <item.icon />
                  {item.label}
                </Link>
              ))}

              {session ? (
                <div className="flex w-full flex-col">
                  {menuItems.logged.map((item) => (
                    <Link
                      href={
                        item.label === "Account"
                          ? `/account/${session.user._id}`
                          : item.href
                      }
                      onClick={() =>
                        closeOnCurrent(
                          item.label === "Account"
                            ? `/account/${session.user._id}`
                            : item.href,
                        )
                      }
                      className="flex items-center gap-x-3 pb-10 text-3xl tracking-widest text-white"
                    >
                      <item.icon />
                      {item.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="flex w-full flex-col gap-y-4">
                  {menuItems.notLogged.map((item) => (
                    <Link
                      href={item.href}
                      onClick={() => closeOnCurrent(item.href)}
                      className={
                        item.label === "Log in"
                          ? buttonVariants({
                              variant: "outline",
                              className:
                                "bg-black uppercase text-white hover:hover:bg-secondary/80",
                            })
                          : buttonVariants({
                              variant: "secondary",
                              className: "uppercase",
                            })
                      }
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        </MotionConfig>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
