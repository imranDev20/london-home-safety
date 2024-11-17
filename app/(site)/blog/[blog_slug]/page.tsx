import { getSettings } from "@/app/admin/(require-auth)/settings/actions";
import PageHeader from "@/components/page-header";
import BackgroundImage from "@/images/hero-image-new.jpeg";
import { kebabToNormal } from "@/lib/utils";
import BlogDetails from "./_components/blog-details";

export default async function BlogDetailsPage({
  params,
}: {
  params: {
    blog_slug: string;
  };
}) {
  const { blog_slug } = params;
  console.log("Route category_id:", blog_slug); // Debug log

  const breadCrumbOptions = [
    {
      label: "Blog",
      path: "/blog",
    },
    {
      label: kebabToNormal(blog_slug),
      isCurrentPage: true,
    },
  ];

  return (
    <div>
      <PageHeader
        backgroundImage={BackgroundImage}
        breadCrumbOptions={breadCrumbOptions}
      />

      <BlogDetails />
    </div>
  );
}
