import { generateBlogData } from "@/shared/data";

// This function retrieves the blog details based on the blog path
export const getBlogDetails = (path: string) => {
  // Get the blog data array
  const blogs = generateBlogData();
  console.log("blogs", blogs);

  // Find the blog that matches the given path
  const blog = blogs.find((blog) => blog.path === path);

  // If no matching blog is found, return null (handle 404 page later if needed)
  if (!blog) {
    return null;
  }

  return blog;
};

// Function to handle any analytics or other side effects on blog card click
export const handleBlogClick = (blogPath: string) => {
  // For example, send analytics or log the interaction
  console.log(`Blog clicked: ${blogPath}`);

  // You could add more logic here, such as tracking views, etc.
};

// Exporting any additional actions you may need later
export const getBlogsList = () => {
  // Just return the entire list of blogs
  return generateBlogData();
};
