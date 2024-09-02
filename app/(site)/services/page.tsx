import PageHeader from "@/components/page-header";
import BackgroundImage from "@/images/hero-image-new.jpeg";
import ServiceCategories from "../_components/service-categories";
import ServiceItems from "./_components/service-items";

const breadCrumbOptions = [
  {
    label: "Services",
    isCurrentPage: true,
  },
];

export default function ServicesPage() {
  return (
    <div>
      <PageHeader
        backgroundImage={BackgroundImage}
        breadCrumbOptions={breadCrumbOptions}
      />
      <ServiceCategories />
      <ServiceItems />
    </div>
  );
}
