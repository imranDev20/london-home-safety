"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ALL_SERVICES } from "@/shared/data";
import { kebabCaseToNormalText } from "@/shared/function";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CategoryServices({
  categoryId: category,
}: {
  categoryId: string;
}) {
  const services = ALL_SERVICES.filter((item) =>
    item.categoryPath?.includes(category)
  );

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="bg-gradient-to-br from-sky-50 via-white to-sky-100 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900 leading-tight"
        >
          Expert{" "}
          <span className="text-primary">
            {kebabCaseToNormalText(category)}
          </span>{" "}
          <br /> for Your Peace of Mind
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className="overflow-hidden shadow-lg transition-all duration-300 h-full flex flex-col"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <CardHeader className="p-0 relative overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.label}
                    className="w-full h-64 object-cover transition-transform duration-300"
                    width={400}
                    height={256}
                    loading="lazy"
                    style={{
                      transform:
                        hoveredIndex === index ? "scale(1.05)" : "scale(1)",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <h4 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
                    {item.label}
                  </h4>
                </CardHeader>
                <CardContent className="p-6 flex-grow">
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
                <CardFooter className="bg-gray-50 px-6 py-4 flex justify-between items-center">
                  <div className="flex flex-col">
                    <p className="text-sm text-gray-500">Starts from</p>
                    <span className="text-primary text-2xl font-bold">
                      £180
                    </span>
                  </div>
                  <Link href="/book-now">
                    <Button className="bg-primary text-white font-semibold py-2 px-6 rounded-full hover:bg-secondary hover:text-body-dark transition-colors duration-200 shadow-md hover:shadow-lg">
                      Book Now
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
