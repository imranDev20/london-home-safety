"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { NavLeafItem, SiteSettingWithRelations } from "@/types/misc";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useCallback } from "react";

export default function BlogCard({
  blog,
  index,
  isVisible,
}: {
  blog: NavLeafItem;
  index: number;
  isVisible: boolean;
  siteSettings: SiteSettingWithRelations;
}) {
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
        <Link href={`/blog${blog.path}`} className="flex-grow">
          <CardHeader className="p-0 relative overflow-hidden">
            <div className="w-full h-48 sm:h-64 relative">
              <Image
                src={blog.image}
                alt={blog.label}
                layout="fill"
                objectFit="cover"
                className={`transition-transform duration-300 ${isHovered ? "scale-105" : "scale-100"}`}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <h4 className="absolute bottom-4 left-4 text-xl sm:text-2xl font-bold text-white">
              {blog.label}
            </h4>
          </CardHeader>

          <CardContent className="p-4 sm:p-6 flex-grow">
            <p className="text-gray-600 text-sm sm:text-base">{blog.description}</p>
          </CardContent>
        </Link>
        <CardFooter className="bg-gray-50 px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <div className="flex items-center mt-2 mx-2">
            <Avatar className="mr-2">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p>
              by <span className="text-primary">{blog.authorName}</span> - {blog.publishedDate}
            </p>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}