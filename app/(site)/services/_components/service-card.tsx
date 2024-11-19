"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { NavLeafItem, SiteSettingWithRelations } from "@/types/misc";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useCallback } from "react";

export default function ServiceCard({
  service,
  index,
  isVisible,
  price,
  siteSettings,
}: {
  service: NavLeafItem;
  index: number;
  isVisible: boolean;
  price: number | string;
  siteSettings: SiteSettingWithRelations;
}) {
  const { description, image, path, label, categoryPath, abbr } = service;
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="w-full"
    >
      <Card
        className="overflow-hidden shadow-lg transition-all duration-300 h-full flex flex-col hover:shadow-2xl"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Link href={`/services${categoryPath}${path}`} className="flex-grow">
          <CardHeader className="p-0 relative overflow-hidden">
            <div className="w-full h-48 sm:h-64 relative">
              <Image
                src={image}
                alt={label}
                layout="fill"
                objectFit="cover"
                className={`transition-transform duration-300 ${
                  isHovered ? "scale-105" : "scale-100"
                }`}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <h4 className="absolute bottom-4 left-4 text-xl sm:text-2xl font-bold text-white">
              {label} {abbr ? `(${abbr})` : ""}
            </h4>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 flex-grow">
            <p className="text-gray-600 text-sm sm:text-base">{description}</p>
          </CardContent>
        </Link>
        <CardFooter className="bg-gray-50 px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <div className="flex flex-col">
            <p className="text-xs sm:text-sm text-gray-500">
              {typeof price === "number" ? "Starting from" : "For Price"}
            </p>
            <span className="text-primary text-lg sm:text-2xl font-bold">
              {typeof price === "number" ? `£${price.toFixed(2)}` : "Call Us"}
            </span>
          </div>
          <div>
            {typeof price === "number" ? (
              <Link href={`/services${categoryPath}${path}`}>
                <Button className="bg-primary text-white font-semibold py-2 px-4 sm:px-6 rounded-full hover:bg-secondary hover:text-body-dark transition-colors duration-200 shadow-md hover:shadow-lg text-sm sm:text-base">
                  Book Now
                </Button>
              </Link>
            ) : (
              <Button
                className="bg-primary text-white font-semibold py-2 px-4 sm:px-6 rounded-full hover:bg-secondary hover:text-body-dark transition-colors duration-200 shadow-md hover:shadow-lg text-sm sm:text-base"
                onClick={() =>
                  (window.location.href = `tel:${siteSettings?.phone1 || ""}`)
                }
              >
                Call Now
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
