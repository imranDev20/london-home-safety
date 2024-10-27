"use client";

import React from "react";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import useOrderStore from "@/hooks/use-order-store";
import { useSheetStore } from "@/hooks/use-sheet-store"; // Assume this is your zustand store

const FloatingCart = () => {
  const { cartItems } = useOrderStore();
  const { setIsOpen } = useSheetStore();

  const itemCount = cartItems.length;

  return (
    <>
      <motion.button
        className="fixed bottom-6 right-6 p-4 bg-primary text-white rounded-full shadow-xl hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 z-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
      >
        <ShoppingCart className="h-6 w-6" />
        {itemCount > 0 && (
          <motion.span
            className="absolute -top-2 -right-2 bg-secondary text-black text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center border-2 border-white"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            {itemCount}
          </motion.span>
        )}
        <motion.span
          className="absolute inset-0 rounded-full bg-white"
          initial={{ scale: 0 }}
          animate={{ scale: 0 }}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          style={{ opacity: 0.15 }}
        />
      </motion.button>
    </>
  );
};

export default FloatingCart;
