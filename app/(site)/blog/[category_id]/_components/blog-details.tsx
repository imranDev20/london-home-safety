// blog-details.tsx
"use client";

import { generateBlogData } from "@/shared/data";
import { SiteSettingWithRelations } from "@/types/misc";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

type BlogData = {
  label: string;
  path: string;
  image: any;
  description: string;
  authorName: string;
  publishedDate: string;
  detailedDesc: {
    details: string;
    points: string[];
  };
  pageContent?: {
    title: string;
    html: string;
  };
};

export default function BlogDetails({
  categoryId,
  siteSettings,
}: {
  categoryId: string;
  siteSettings: SiteSettingWithRelations;
}) {
  const controls = useAnimation();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [blogData, setBlogData] = useState<BlogData | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const allBlogs = generateBlogData();
    
    // Find the specific blog post based on the path
    const currentBlogIndex = allBlogs.findIndex(blog => blog.path === `/${categoryId}`);
    const currentBlog = allBlogs[currentBlogIndex];

    // Set blog data and index for navigation
    if (currentBlog) {
      setBlogData(currentBlog);
      setCurrentIndex(currentBlogIndex);
    }

    // Intersection observer for animation
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
  }, [categoryId, controls]);

  if (!blogData) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Navigation handlers for previous and next buttons
  const handlePrevious = () => {
    if (currentIndex !== null && currentIndex > 0) {
      const prevPath = generateBlogData()[currentIndex - 1].path;
      router.push(`/blog/${prevPath}`);
    }
  };

  const handleNext = () => {
    if (currentIndex !== null && currentIndex < generateBlogData().length - 1) {
      const nextPath = generateBlogData()[currentIndex + 1].path;
      router.push(`/blog/${nextPath}`);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-10 bg-gradient-to-t from-blue-50 to-white"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
          {/* Hero Image */}
          <div className="relative w-full h-[400px]">
            {blogData.image && (
              <Image
                src={blogData.image}
                alt={blogData.label || 'Blog image'}
                layout="fill"
                objectFit="cover"
                priority
              />
            )}
          </div>

          <div className="p-8">
            {(blogData.authorName || blogData.publishedDate) && (
              <div className="flex items-center mb-6">
                <Avatar className="mr-2">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="text-sm text-gray-600">
                  {blogData.authorName && (
                    <>
                      by <span className="text-primary font-medium">{blogData.authorName}</span>
                    </>
                  )}
                  {blogData.authorName && blogData.publishedDate && (
                    <span className="mx-2">•</span>
                  )}
                  {blogData.publishedDate}
                </div>
              </div>
            )}

            {blogData.label && (
              <h1 className="text-4xl font-bold mb-6 text-gray-900">
                {blogData.label}
              </h1>
            )}

            {blogData.description && (
              <div className="prose max-w-none mb-8">
                <h2 className="text-2xl font-semibold mb-4">Overview</h2>
                <p className="text-gray-700">{blogData.description}</p>
              </div>
            )}

            {blogData.detailedDesc && (
              <div className="prose max-w-none mb-8">
                <h2 className="text-2xl font-semibold mb-4">Details</h2>
                {blogData.detailedDesc.details && (
                  <p className="text-gray-700 mb-4">{blogData.detailedDesc.details}</p>
                )}
                
                {blogData.detailedDesc.points && blogData.detailedDesc.points.length > 0 && (
                  <>
                    <h3 className="text-xl font-semibold mb-3">Key Points</h3>
                    <ul className="list-disc pl-6 text-gray-700 space-y-2">
                      {blogData.detailedDesc.points.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            )}

            {blogData.pageContent?.html && (
              <div 
                className="prose max-w-none mt-8"
                dangerouslySetInnerHTML={{ __html: blogData.pageContent.html }}
              />
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8">
            <button 
              onClick={handlePrevious}
              className="text-primary font-semibold py-2 px-4 rounded hover:bg-gray-200 transition disabled:opacity-50"
              disabled={currentIndex === 0}
            >
              Previous
            </button>
            
            <button 
              onClick={handleNext}
              className="text-primary font-semibold py-2 px-4 rounded hover:bg-gray-200 transition disabled:opacity-50"
              disabled={currentIndex === generateBlogData().length - 1}
            >
              Next
            </button>
          </div>
      </div>
    </section>
  );
}
