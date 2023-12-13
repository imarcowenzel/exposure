"use client";

import { useCycle } from "framer-motion";
import { ContrastIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import MobileMenu from "./mobile-menu";
import MobileButtonMenu from "./mobile-menu-button";

const MobileNavbar = () => {
  const [isOpen, toggleMenu] = useCycle(false, true);
  const { data: session } = useSession();
  const pathname = usePathname();

  const closeMenu = () => {
    toggleMenu(0);
  };

  // Whenever we click an item in the menu and navigate away, we want to close the menu.
  useEffect(() => {
    closeMenu();
  }, [pathname]);

  // When we click the path we are currently on, we still want the mobile menu to close,
  // however we cant rely on the pathname for it because that won't change (we're already there)
  const closeOnCurrent = (href: string) => {
    if (pathname === href) {
      closeMenu();
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
    <nav className="sticky inset-0 z-50 h-full overflow-y-hidden lg:hidden">
      <div className="bg-black px-5 py-3">
        {/* Nav */}
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-x-1 text-white">
            <ContrastIcon size={24} />
            <h1 className="text-xs leading-loose">EXPOSURE</h1>
          </Link>
          <MobileButtonMenu toggleMenu={toggleMenu} isOpen={isOpen} />
        </div>
      </div>
      {/* Menu */}
      <MobileMenu
        isOpen={isOpen}
        closeOnCurrent={closeOnCurrent}
        session={session}
      />
    </nav>
  );
};

export default MobileNavbar;
