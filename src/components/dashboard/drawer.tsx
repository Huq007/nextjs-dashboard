"use client";

import { motion, AnimatePresence } from "motion/react";
import { useDrawer } from "@/hooks/use-drawer";
import { SideNav } from "./side-nav";

export function Drawer() {
  const { isOpen, closeDrawer } = useDrawer();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed left-0 top-0 z-50 h-full w-64 bg-white dark:bg-neutral-900 md:hidden"
          >
            <SideNav />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
