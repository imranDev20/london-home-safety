import PageHeader from "@/components/page-header";
import BackgroundImage from "@/images/hero-image-new.jpeg";
import { kebabCaseToNormalText } from "@/shared/function";
import CallToAction from "../../_components/call-to-action";
import Partners from "../../about/_components/partners";
import AboutCategory from "./_components/about-category";
import CategoryServices from "./_components/category-services";

export default function CategoryDetailsPage({
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
      label: kebabCaseToNormalText(category_id),
      isCurrentPage: true,
    },
  ];
  return (
    <div>
      <PageHeader
        backgroundImage={BackgroundImage}
        breadCrumbOptions={breadCrumbOptions}
      />
      <CategoryServices categoryId={category_id} />
      <AboutCategory categoryId={category_id} />
      <CallToAction />
      <Partners />
    </div>
  );
}
