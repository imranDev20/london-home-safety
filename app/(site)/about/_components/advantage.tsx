"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { ADVANTAGES } from "@/shared/data";
import { motion } from "framer-motion";
import useIntersectionObserver from "@/hooks/use-intersection-observer";

export default function Advantages() {
  const [sectionRef, inView] = useIntersectionObserver({
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="bg-gradient-to-b from-blue-50 to-white py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-20"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-extrabold text-body-dark leading-tight"
          >
            Why Choose
            <span className="text-primary block mt-2 relative">
              London Home Safety
              <svg
                className="absolute w-full h-3 -bottom-2 left-0 text-primary opacity-30"
                viewBox="0 0 200 9"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  d="M0,7 C50,9 100,4 150,6 L200,7 L200,9 L0,9 Z"
                />
              </svg>
            </span>
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="mt-6 max-w-3xl mx-auto"
          >
            <p className="text-xl text-gray-600 leading-relaxed">
              We pride ourselves on delivering exceptional service and
              unparalleled expertise. Our certified professionals, competitive
              pricing, rapid response times, and flexible scheduling make us the
              trusted choice for all your home safety needs.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {ADVANTAGES?.map((advantage) => (
            <motion.div key={advantage.id} variants={itemVariants}>
              <Card className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2">
                <div className="flex flex-col items-center">
                  <div className="bg-primary/10 bg-opacity-10 p-4 rounded-full mb-6 transition-transform duration-300 ease-in-out transform hover:scale-110">
                    <advantage.Icon
                      width={40}
                      height={40}
                      className="text-primary fill-primary"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">
                    {advantage.advantageName}
                  </h3>
                  <p className="text-gray-600 text-center">
                    {advantage.advantageDetail}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
