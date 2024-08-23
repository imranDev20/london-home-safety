import PageHeader from "@/components/page-header";
import backgroundImage from "@/images/about-bg.jpeg";
import { ALL_SERVICES } from "@/shared/data";
import { kebabCaseToNormalText } from "@/shared/function";
import ServicePropertyType from "./_components/service-property-type";

export default function ServiceDetailsPage({
  params,
}: {
  params: {
    service_id: string;
    category_id: string;
  };
}) {
  const { service_id, category_id } = params;

  const currentService = ALL_SERVICES.find((service) =>
    service.path.includes(service_id)
  );
  const breadCrumbOptions = [
    {
      label: "Services",
      path: "/services",
    },
    {
      label: kebabCaseToNormalText(category_id),
      path: `/services/${category_id}`,
    },
    {
      label: kebabCaseToNormalText(service_id),
      isCurrentPage: true,
    },
  ];
  return (
    <>
      <PageHeader
        backgroundImage={backgroundImage}
        breadCrumbOptions={breadCrumbOptions}
      />
      <ServicePropertyType categoryId={category_id} serviceId={service_id} />
    </>
  );
}
