// pages/blog/[blogId]/_components/BlogDetails.tsx
import Image from "next/image";
import { motion } from "framer-motion";

const DetailsBlog = ({ currentBlog }) => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Blog Title */}
        <motion.h1
          className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {currentBlog.label}
        </motion.h1>

        {/* Blog Image */}
        <motion.div
          className="relative w-full h-64 sm:h-96 mb-12"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={currentBlog.image}
            alt={currentBlog.label}
            fill
            style={{ objectFit: "cover" }} // Use fill instead of layout="fill" in Next.js 13
            className="rounded-lg"
          />
        </motion.div>

        {/* Blog Description */}
        <motion.div
          className="prose prose-lg max-w-none text-gray-700 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p>{currentBlog.description}</p>
        </motion.div>

        {/* Detailed Description */}
        <motion.div
          className="prose prose-lg max-w-none text-gray-700 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          dangerouslySetInnerHTML={{ __html: currentBlog.pageContent.html }} // Render HTML content
        />
      </div>
    </section>
  );
};

export default DetailsBlog;
