"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { NAV_ITEMS } from "@/shared/data";
import { Card, CardContent } from "@/components/ui/card";
import { motion, useAnimation } from "framer-motion";
import { Shield, Zap, FireExtinguisher, Flame, HeartPulse } from "lucide-react";

const iconMap = {
  "Fire Services": FireExtinguisher,
  "Gas Services": Flame,
  "Health & Safety Services": HeartPulse,
  "Electrical Services": Zap,
} as any;

export default function ServiceCategories() {
  const serviceItems =
    NAV_ITEMS.find((item) => item.label === "Services")?.children || [];

  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const controls = useAnimation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          controls.start("visible");
          observer.disconnect(); // Stop observing after animation triggers
        }
      },
      {
        threshold: 0.5, // Adjust the threshold to trigger the animation earlier or later
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [controls]);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-blue-50 to-white"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-center mb-16 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          Discover Our Wide Range of
          <span className="text-primary block mt-2">Safety Solutions</span>
        </motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {serviceItems.map((service, index) => {
            const Icon = iconMap[service.label] || Shield;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={controls}
                variants={{
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.6, delay: index * 0.1 },
                  },
                }}
              >
                <Link
                  href={`/services${service.path}`}
                  className="block h-full"
                >
                  <Card className="h-full overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex items-center mb-4">
                        <div className="p-3 rounded-full bg-primary text-white mr-4 group-hover:bg-white group-hover:text-primary transition-all duration-300">
                          <Icon size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300">
                          {service.label}
                        </h3>
                      </div>
                      <p className="text-body flex-grow">
                        {service.description}
                      </p>
                      <div className="mt-6 flex items-center text-primary font-semibold">
                        Learn More
                        <svg
                          className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
