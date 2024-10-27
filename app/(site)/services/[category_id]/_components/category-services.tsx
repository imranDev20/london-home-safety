"use client";

import { kebabToNormal, mergeArrays } from "@/lib/utils";
import { ALL_SERVICES } from "@/shared/data";
import { SiteSettingWithRelations } from "@/types/misc";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ServiceCard from "../../_components/service-card";
import { Package } from "@prisma/client";

export default function CategoryServices({
  categoryId: category,
  packages,
  siteSettings,
}: {
  categoryId: string;
  packages: Package[];
  siteSettings: SiteSettingWithRelations;
}) {
  const controls = useAnimation();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const services = ALL_SERVICES.filter((item) =>
    item.categoryPath?.includes(category)
  );

  const mergedData = mergeArrays(services, packages, "label", "serviceName");

  console.log(mergedData);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          controls.start("visible");
        }
      },
      {
        threshold: 0.2,
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
      className="py-24 bg-gradient-to-t from-blue-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          className="text-center mb-16 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          Expert <span className="text-primary">{kebabToNormal(category)}</span>
          <span className="block mt-2 relative">
            for Your Peace of Mind
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
        </motion.h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {mergedData.map((service, index) => (
            <ServiceCard
              siteSettings={siteSettings}
              key={service.label}
              service={service}
              index={index}
              isVisible={isVisible}
              price={
                service.packages.sort((a, b) => a.price - b.price)[0]?.price ??
                "Call Us"
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
