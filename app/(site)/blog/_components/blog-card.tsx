"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { NavLeafItem, SiteSettingWithRelations } from "@/types/misc";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useCallback } from "react";

interface BlogCardProps {
  blog: NavLeafItem;
  index: number;
  isVisible: boolean;
  siteSettings: SiteSettingWithRelations;
}

export default function BlogCard({ blog, index, isVisible }: BlogCardProps) {
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
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`overflow-hidden shadow-lg transition-transform duration-300 h-full flex flex-col ${
          isHovered ? "hover:scale-105 shadow-2xl" : "hover:shadow-lg"
        }`}
      >
        <Link href={`/blog${blog.path}`} className="flex-grow">
        

          {/* Card Header with Image */}
          <CardHeader className="p-0 relative overflow-hidden">
            <div className="relative w-full h-48 sm:h-64">
              <Image
                src={blog.image}
                alt={blog.label}
                layout="fill"
                objectFit="cover"
                className={`transition-transform duration-300 ${
                  isHovered ? "scale-105" : "scale-100"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
              {/* Blog Label - positioned outside the image */}
          <h4 className="text-xl sm:text-2xl font-bold text-gray-900 px-4 pt-4">
            {blog.label}
          </h4>
          </CardHeader>

          {/* Card Content */}
          <CardContent className="p-4 sm:p-6 flex-grow">
            <p className="text-gray-700 text-sm sm:text-base">{blog.description}</p>
          </CardContent>
        </Link>

        {/* Card Footer */}
        <CardFooter className="bg-gray-50 px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
  <div className="flex items-center">
    <Avatar className="mr-2">
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    <p className="text-gray-700">
      by <span className="text-primary font-semibold">{blog.authorName}</span>
    </p>
  </div>
  <div className="text-gray-600 text-sm">
    <p>
      {blog.publishedDate ? new Date(blog.publishedDate).toLocaleDateString() : "Date not available"}
    </p>
  </div>
</CardFooter>

      </Card>
    </motion.div>
  );
}
