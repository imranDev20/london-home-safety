import { getPackages } from "@/app/admin/(require-auth)/orders/[order_id]/actions";
import PageHeader from "@/components/page-header";
import BackgroundImage from "@/images/services-bg.jpg";
import ServiceCategories from "../_components/service-categories";
import ServiceItems from "./_components/service-items";

const breadCrumbOptions = [
  {
    label: "Services",
    isCurrentPage: true,
  },
];

export default async function ServicesPage() {
  const packages = await getPackages();

  return (
    <div>
      <PageHeader
        backgroundImage={BackgroundImage}
        breadCrumbOptions={breadCrumbOptions}
      />
      <ServiceCategories />
      <ServiceItems packages={packages} />
    </div>
  );
}
