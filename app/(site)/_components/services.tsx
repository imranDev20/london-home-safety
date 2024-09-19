"use client";

import { Button } from "@/components/ui/button";
import { mergeArrays } from "@/lib/utils";
import { ALL_SERVICES } from "@/shared/data";
import { SiteSettingWithUserAddress } from "@/types/misc";
import { Package } from "@prisma/client";
import { motion, useAnimation } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import ServiceCard from "../services/_components/service-card";

interface ServiceCardProps {
  title: string;
  price: number;
  Icon: React.ElementType;
}

// const ServiceCard = React.memo(({ title, Icon, price }: ServiceCardProps) => {
// return (
//   <motion.div
//     initial={{ opacity: 0, scale: 0.9 }}
//     animate={{ opacity: 1, scale: 1 }}
//     transition={{ duration: 0.3 }}
//   >
{
  /* <Card className="h-full overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white">
        <CardContent className="p-6 flex flex-col items-center h-full">
          <div>
            <div className="p-3 pb-5 rounded-full text-white group-hover:bg-white group-hover:text-primary transition-all duration-300 flex flex-col items-center">
              <Icon height={78} width={78} />
            </div>
            <CardTitle className="text-xl font-bold text-gray-900 h-28 group-hover:text-primary transition-colors duration-300 text-center">
              {title}
            </CardTitle>
          </div>

          <p className="text-body flex-grow text-sm">
            {typeof price === "number" ? "Starting from" : "For Price"}
          </p>
          <p className="text-2xl font-bold text-primary mt-2">
            {typeof price === "number" ? `£${price?.toFixed(2)}` : "Call Us"}
          </p>
        </CardContent>

        <CardFooter>
          <Button className="w-full border-gray-200" variant="outline">
            Book Now
            <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
          </Button>
        </CardFooter>
      </Card> */
}
//     </motion.div>
//   );
// });

// ServiceCard.displayName = "ServiceCard";

export default function Services({
  packages,
  siteSettings,
}: {
  packages: Package[];
  siteSettings: SiteSettingWithUserAddress;
}) {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);
  const controls = useAnimation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          controls.start("visible");
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [controls]);

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

  const mergedData = mergeArrays(
    ALL_SERVICES,
    packages,
    "label",
    "serviceName"
  );

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
        {/* <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {mergedData.map((service, index) => (
            <motion.div
              key={service.label}
              initial={{ opacity: 0, scale: 0.5 }}
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
                href={`/services${service.categoryPath}/${service.label
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="block h-full"
              >
                <ServiceCard
                  title={service.label}
                  Icon={service.Icon}
                  price={
                    service.packages.sort((a, b) => a.price - b.price)[0]
                      ?.price ?? "Call Us For Price"
                  }
                />
              </Link>
            </motion.div>
          ))}
        </div> */}
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
            <Link href="/book-now" className="inline-flex items-center">
              See All Services
              <ChevronRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
