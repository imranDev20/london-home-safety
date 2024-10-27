"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function AnimatedSection({
  children,
  className,
}: AnimatedSectionProps): JSX.Element {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={className}
    >
      <motion.div variants={itemVariants}>{children}</motion.div>
    </motion.section>
  );
}
