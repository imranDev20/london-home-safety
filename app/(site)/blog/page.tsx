import { getSettings } from "@/app/admin/(require-auth)/settings/actions";
import PageHeader from "@/components/page-header";
import BackgroundImage from "@/images/electric.jpg";
import BlogItems from "./_components/blog-items";


const breadCrumbOptions = [
  {
    label: "Blog",
    isCurrentPage: true,
  },
];

export default async function Blog() {
  const siteSettings = await getSettings();
  return (
    <div>
      <PageHeader
        backgroundImage={BackgroundImage}
        breadCrumbOptions={breadCrumbOptions}
      />
      {/* <BlogHome siteSettings={siteSettings}/> */}
      <BlogItems siteSettings={siteSettings} />
      
    </div>
  );
}
