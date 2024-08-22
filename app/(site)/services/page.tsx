import ServiceCategories from "../_components/service-categories";
import PageHeader from "./_components/page-header";
import ServiceItems from "./_components/service-items";

export default function ServicesPage() {
  return (
    <div>
      <PageHeader />
      <ServiceCategories />
      <ServiceItems />
    </div>
  );
}
