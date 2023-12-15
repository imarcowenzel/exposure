"use client";

import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  const modalClasses = isOpen
    ? "fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out touch-none overflow-hidden"
    : "fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out opacity-0 pointer-events-none touch-none";

  return (
    <div className={modalClasses} >
      <div className="absolute h-full w-full bg-gray-900 opacity-50"></div>

      <div className=" z-50 mx-auto w-11/12 overflow-y-hidden rounded bg-white shadow-lg md:max-w-md">
        <div className="px-6 py-8 ">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
