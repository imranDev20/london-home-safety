import React, { useState, useEffect } from "react";
import { ALL_BLOGS } from "@/shared/data"; // Assuming this is where blog data is stored
import { kebabToNormal } from "@/lib/utils"; // Utility to format category names
import { SiteSettingWithRelations } from "@/types/misc"; 
import BlogCard from "../../_components/blog-card";



export default function BlogCategory({
  categoryId: category, // Category ID passed from props
  siteSettings, // Pass the siteSettings prop from parent
}: {
  categoryId: string;
  siteSettings: SiteSettingWithRelations;
}) {
  // State to track visibility of blog cards
  const [isVisible, setIsVisible] = useState(false);

  // Filter blogs by the given category
  const filteredBlogs = ALL_BLOGS.filter((blog) =>
    blog.categoryPath?.includes(category)
  );

  // Example of effect to handle visibility (you can customize it further)
  useEffect(() => {
    const onScroll = () => {
      // Update visibility based on scroll position (or any other logic)
      setIsVisible(true); // Set true when blogs should become visible (e.g., after scrolling)
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="py-24 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section title */}
        <h2 className="text-center mb-16 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
          Blog Category:{" "}
          <span className="text-primary block mt-2 relative">
            {kebabToNormal(category)}
            {/* Decorative underline */}
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
        </h2>

        {/* Introductory paragraph */}
        <p className="text-body leading-loose text-center max-w-3xl mx-auto mb-16">
          Welcome to the{" "}
          <span className="text-primary">
            {kebabToNormal(category)}
          </span>{" "}
          section of our blog, where we discuss the latest insights and trends
          in this category. Stay informed and explore articles that will help
          you stay updated and knowledgeable.
        </p>

        {/* Blog posts grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog, index) => (
              <BlogCard
                key={blog.path}
                blog={blog} // Pass blog data
                index={index} // Pass index for animation
                isVisible={isVisible} // Pass the visibility state
                siteSettings={siteSettings} // Pass site settings as required
              />
            ))
          ) : (
            <p className="text-center col-span-full">
              No blog posts available in this category yet.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
