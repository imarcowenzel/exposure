import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { Search, Settings } from "lucide-react";
import { Session } from "next-auth";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import {
    MenuItemProps,
    menuItems
} from "@/config";
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

              {menuItems.map((item, i) => (
                <Link
                  key={i}
                  onClick={() => closeOnCurrent(item.label === "Profile" ? `/profile/${session?.user._id}` : item.href)}
                  href={item.label === "Profile" ? `/profile/${session?.user._id}` : item.href}
                  className="flex items-center gap-x-3 pb-10 text-3xl tracking-widest text-white"
                >
                  {<item.icon />}
                  {item.label}
                </Link>
              ))}

              {session ? (
                <div className="flex w-full flex-col">
                  <Link
                    onClick={() => closeOnCurrent("/search")}
                    href="/search"
                    className="flex items-center gap-x-3 pb-10 text-3xl tracking-widest text-white"
                  >
                    <Search />
                    Search
                  </Link>
                  <Link
                    onClick={() =>
                      closeOnCurrent(`/account/${session.user._id}`)
                    }
                    href={`/account/${session.user._id}`}
                    className="flex items-center gap-x-3 pb-10 text-3xl tracking-widest text-white"
                  >
                    <Settings />
                    Account
                  </Link>
                </div>
              ) : (
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
              )}
            </motion.div>
          </motion.div>
        </MotionConfig>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
