import PageHeader from "@/components/common/page-header";
import backgroundImage from "@/images/about-bg.jpeg";
import { ALL_SERVICES } from "@/shared/data";
import { kebabCaseToNormalText } from "@/shared/function";
import Image from "next/image";
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
      <div className="max-w-5xl mx-auto mt-20">
        <h1 className="text-4xl font-bold text-center mx-auto mb-10 w-[65%]">
          {currentService?.pageContent?.title}
        </h1>
        {currentService?.image && (
          <Image
            src={currentService?.image}
            alt="serviceImage"
            objectFit="cover"
            className="w"
          />
        )}
      </div>
    </>
  );
}
