import PageHeader from "@/components/page-header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import backgroundImage from "@/images/about-bg.jpeg";
import { ALL_SERVICES } from "@/shared/data";
import { kebabCaseToNormalText } from "@/shared/function";
import Image from "next/image";
import ServiceDetailsCta from "./_components/service-details-cta";
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
      <div className="max-w-4xl mx-auto mt-20">
        <h1 className="text-4xl font-bold text-center mx-auto mb-10 leading-normal w-[70%]">
          {currentService?.pageContent?.title}
        </h1>
        {currentService?.image && (
          <Image
            src={currentService?.image}
            alt="serviceImage"
            objectFit="cover"
            className=" mb-8 h-72 mx-auto rounded-2xl"
          />
        )}
        {currentService?.pageContent?.html ? (
          <div
            dangerouslySetInnerHTML={{
              __html: currentService?.pageContent?.html,
            }}
            className="mt-5 leading-relaxed"
          />
        ) : null}
        <ServiceDetailsCta />
        <div className=" my-20">
          <h1 className="text-4xl text-center font-bold mb-6 ">
            Frequently Asked Questions
          </h1>
          {currentService?.faqs && currentService.faqs.length > 0 && (
            <Accordion type="single" collapsible className="w-full  ">
              {currentService?.faqs.map((item) => (
                <AccordionItem key={item.ques} value={item.ques}>
                  <AccordionTrigger className="text-lg text-gray-700 font-semibold hover:no-underline">
                    {item.ques}
                  </AccordionTrigger>
                  <AccordionContent className="text-lg  text-gray-500">
                    {item.ans}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </div>
    </>
  );
}
