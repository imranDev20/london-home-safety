import { getSettings } from "@/app/admin/(require-auth)/settings/actions";
import PageHeader from "@/components/page-header";
import BackgroundImage from "@/images/hero-image-new.jpeg";
import { kebabToNormal } from "@/lib/utils";
import CallToAction from "../../_components/call-to-action";
import Partners from "../../about/_components/partners";
import AboutCategory from "./_components/about-category";
import CategoryServices from "./_components/category-services";
import { getPackages } from "@/app/admin/(require-auth)/orders/[order_id]/actions";

export default async function CategoryDetailsPage({
  params,
}: {
  params: {
    category_id: string;
  };
}) {
  const { category_id } = params;

  const breadCrumbOptions = [
    {
      label: "Services",
      path: "/services",
    },
    {
      label: kebabToNormal(category_id),
      isCurrentPage: true,
    },
  ];

  const siteSettings = await getSettings();
  const packages = await getPackages();

  return (
    <div>
      <PageHeader
        backgroundImage={BackgroundImage}
        breadCrumbOptions={breadCrumbOptions}
      />
      <CategoryServices
        siteSettings={siteSettings}
        categoryId={category_id}
        packages={packages}
      />
      <AboutCategory categoryId={category_id} />
      <CallToAction siteSettings={siteSettings} />
      <Partners />
    </div>
  );
}
