"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { NavLeafItem } from "@/types/misc";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ServiceCard({
  service,
  index,
  isVisible,
}: {
  service: NavLeafItem;
  index: number;
  isVisible: boolean;
}) {
  const { description, image, path, label, categoryPath } = service;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="w-full"
    >
      <Link href={`/services${categoryPath}${path}`}>
        <Card
          className="overflow-hidden shadow-lg transition-all duration-300 h-full flex flex-col hover:shadow-2xl hover:scale-105"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <CardHeader className="p-0 relative overflow-hidden">
            <Image
              src={image}
              alt={label}
              className="w-full h-64 object-cover transition-transform duration-300"
              width={400}
              height={256}
              loading="lazy"
              style={{
                transform: isHovered ? "scale(1.05)" : "scale(1)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <h4 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
              {label}
            </h4>
          </CardHeader>
          <CardContent className="p-6 flex-grow">
            <p className="text-gray-600">{description}</p>
          </CardContent>
          <CardFooter className="bg-gray-50 px-6 py-4 flex justify-between items-center">
            <div className="flex flex-col">
              <p className="text-sm text-gray-500">Starts from</p>
              <span className="text-primary text-2xl font-bold">£180</span>
            </div>
            <Button className="bg-primary text-white font-semibold py-2 px-6 rounded-full hover:bg-secondary hover:text-body-dark transition-colors duration-200 shadow-md hover:shadow-lg">
              Book Now
            </Button>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}
