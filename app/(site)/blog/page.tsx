// app/blog/page.tsx
import PageHeader from "@/components/page-header";
import BackgroundImage from "@/images/electric.jpg";
import BlogItems from "./_components/blog-items";

export const metadata = {
  title: "Blog | London Home Safety",
  description:
    "Latest insights and guides about home safety, electrical certificates, gas safety, and more.",
};

const breadCrumbOptions = [
  {
    label: "Blog",
    isCurrentPage: true,
  },
];

export default async function BlogPage() {
  return (
    <>
      <PageHeader
        backgroundImage={BackgroundImage}
        breadCrumbOptions={breadCrumbOptions}
      />
      <BlogItems />
    </>
  );
}
