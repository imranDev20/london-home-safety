import { getSettings } from "@/app/admin/(require-auth)/settings/actions";
import PageHeader from "@/components/page-header";
import BackgroundImage from "@/images/hero-image-new.jpeg";
import { kebabToNormal } from "@/lib/utils";
import BlogDetails from "./_components/blog-details";

export default async function BlogDetailsPage({
  params,
}: {
  params: {
    category_id: string;
  };
}) {
  const { category_id } = params;
  console.log("Route category_id:", category_id); // Debug log

  const breadCrumbOptions = [
    {
      label: "Blog",
      path: "/blog",
    },
    {
      label: kebabToNormal(category_id),
      isCurrentPage: true,
    },
  ];

  const siteSettings = await getSettings();
  //   const packages = await getPackages();

  return (
    <div>
      <PageHeader
        backgroundImage={BackgroundImage}
        breadCrumbOptions={breadCrumbOptions}
      />

      <BlogDetails siteSettings={siteSettings} categoryId={category_id} />
    </div>
  );
}
