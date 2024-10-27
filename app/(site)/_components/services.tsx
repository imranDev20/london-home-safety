"use client";

import { Button } from "@/components/ui/button";
import { mergeArrays } from "@/lib/utils";
import { ALL_SERVICES } from "@/shared/data";
import { SiteSettingWithRelations } from "@/types/misc";
import { Package } from "@prisma/client";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import ServiceCard from "../services/_components/service-card";

export default function Services({
  packages,
  siteSettings,
}: {
  packages: Package[];
  siteSettings: SiteSettingWithRelations;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.0,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const mergedData = mergeArrays(
    ALL_SERVICES,
    packages,
    "label",
    "serviceName"
  );

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-24 bg-gradient-to-b from-blue-50 to-white"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-center mb-8 sm:mb-16 text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Discover Our Wide Range of
          <span className="text-primary block mt-2 relative">
            Safety Solutions
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {mergedData.map((service, index) => (
            <ServiceCard
              key={service.label}
              service={service}
              siteSettings={siteSettings}
              index={index}
              isVisible={isVisible}
              price={
                service.packages.sort((a, b) => a.price - b.price)[0]?.price ??
                "Call Us"
              }
            />
          ))}
        </div>

        <motion.div
          className="mt-8 sm:mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Button
            asChild
            size="lg"
            className="px-6 py-3 sm:px-8 sm:py-6 text-white bg-primary hover:bg-primary/90 text-base font-semibold group"
          >
            <Link href="/book-now" className="inline-flex items-center">
              See All Services
              <ChevronRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
