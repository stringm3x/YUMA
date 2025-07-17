"use client";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

export default function Modal({ isOpen, onClose, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-bg bg-opacity-60 z-40 "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="fixed top-4 left-0 z-50 bg-black text-white rounded-br-2xl rounded-tr-2xl overflow-y-auto"
            style={{ width: "75.000%", height: "95vh" }}
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: "0%", opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-red text-3xl sm:text-5xl font-bold"
            >
              ×
            </button>

            <div className="p-8">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
