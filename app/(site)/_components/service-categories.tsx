"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { NAV_ITEMS } from "@/shared/data";
import { Card, CardContent } from "@/components/ui/card";
import { motion, useAnimation } from "framer-motion";
import {
  Shield,
  Zap,
  FireExtinguisher,
  Flame,
  HeartPulse,
  ChevronRight,
  Building,
  LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type IconMapType = {
  [key: string]: LucideIcon;
};

const iconMap: IconMapType = {
  "Fire Services": FireExtinguisher,
  "Gas Services": Flame,
  "Health & Safety Services": HeartPulse,
  "Electrical Services": Zap,
  "Property Management": Building, // New icon for property management
};

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
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [controls]);

  return (
    <section
      ref={sectionRef}
      className="py-24  bg-gradient-to-t from-blue-50 to-white"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-center mb-16 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Explore Our
          <span className="text-primary block mt-2 relative">
            Safety Service Categories
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
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {serviceItems.map((service, index) => {
            const IconComponent =
              service.label in iconMap ? iconMap[service.label] : Shield;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={controls}
                variants={{
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.3, delay: index * 0.1 },
                  },
                }}
              >
                <Link
                  href={`/services${service.path}`}
                  className="block h-full"
                >
                  <Card className="h-full overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white">
                    <CardContent className="p-6 flex flex-col items-center h-full text-center">
                      <div className="mb-4 p-3 rounded-full bg-primary text-white group-hover:bg-white group-hover:text-primary transition-all duration-300">
                        <IconComponent size={24} />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors duration-300 mb-2">
                        {service.label}
                      </h3>
                      <p className="text-body text-sm flex-grow mb-4">
                        {service.description}
                      </p>
                      <div className="text-primary font-semibold text-sm flex items-center">
                        Learn More
                        <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Button
            asChild
            size="lg"
            className="px-8 py-6 text-white bg-primary hover:bg-primary/90 text-base font-semibold group"
          >
            <Link href="/services" className="inline-flex items-center">
              See All Categories
              <ChevronRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
