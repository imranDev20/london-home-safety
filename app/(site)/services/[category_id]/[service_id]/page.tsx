import React from "react";
import { getSettings } from "@/app/admin/(require-auth)/settings/actions";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { kebabToNormal, mergeArrays } from "@/lib/utils";
import { ALL_SERVICES } from "@/shared/data";
import { PropertyType } from "@prisma/client";
import Image from "next/image";
import BookNowButtonCompo from "./_components/book-now-button-compo";
import PackageCard from "./_components/package-card";
import PropertyTypeCompo from "./_components/property-type";
import ServiceDetailsCta from "./_components/service-details-cta";
import ServicePricingSection from "./_components/service-pricing";
import { getPackagesByService } from "./actions";
import ServiceFeatures from "./_components/service-features";
import { Button } from "@/components/ui/button";
import { PhoneCall } from "lucide-react";

export default async function ServiceDetailsPage({
  params: { service_id, category_id },
  searchParams: { property_type },
}: {
  params: { service_id: string; category_id: string };
  searchParams: {
    property_type?: PropertyType;
  };
}) {
  const currentServiceWithoutPackage = ALL_SERVICES.find((service) =>
    service.path.includes(service_id)
  );

  const allPackages = await getPackagesByService(
    currentServiceWithoutPackage?.label ?? ""
  );

  const availablePropertyTypes = Array.from(
    new Set(allPackages.map((pkg) => pkg.propertyType))
  );

  let filteredPackages = allPackages;

  if (availablePropertyTypes.length > 1) {
    if (property_type) {
      // If a property type is selected in the URL, use that
      filteredPackages = allPackages.filter(
        (pkg) => pkg.propertyType === property_type
      );
    } else {
      // If no property type is selected, apply the new default logic
      if (
        availablePropertyTypes.includes("RESIDENTIAL") &&
        availablePropertyTypes.includes("COMMERCIAL")
      ) {
        // Default to RESIDENTIAL when both RESIDENTIAL and COMMERCIAL are available
        filteredPackages = allPackages.filter(
          (pkg) => pkg.propertyType === "RESIDENTIAL"
        );
      } else if (availablePropertyTypes.includes("HMO")) {
        // Default to HMO when HMO is one of the options (assuming HMO, COMMUNAL_AREA, BUSINESS_SECTOR are the other possibilities)
        filteredPackages = allPackages.filter(
          (pkg) => pkg.propertyType === "HMO"
        );
      } else {
        // If neither of the above cases, just use the first available type
        filteredPackages = allPackages.filter(
          (pkg) => pkg.propertyType === availablePropertyTypes[0]
        );
      }
    }
  }

  const mergedData = mergeArrays(
    ALL_SERVICES,
    filteredPackages,
    "label",
    "serviceName"
  );

  const currentService = mergedData.find((service) =>
    service.path.includes(service_id)
  );

  const breadCrumbOptions = [
    { label: "Services", href: "/services" },
    {
      label: kebabToNormal(category_id),
      href: `/services/${category_id}`,
    },
    { label: kebabToNormal(service_id), isCurrentPage: true },
  ];

  const siteSettings = await getSettings();

  return (
    <>
      <section className="relative -mt-[156px] md:-mt-[132px]">
        <Image
          src={currentService?.image}
          alt="Background"
          sizes="100vw"
          fill
          priority
          placeholder="blur"
          className="object-cover"
        />
        <div className="relative py-28 lg:py-20 before:content-[''] before:absolute before:inset-0 before:bg-[#062C64] before:opacity-90 before:mix-blend-multiply">
          <div className="container mx-auto pt-[65px] max-w-screen-xl grid grid-cols-1 md:grid-cols-2 gap-10 px-4 md:px-8 lg:px-16 relative z-10 min-h-[1300px] md:min-h-[950px]">
            <div className="col-span-1 order-2 md:order-1 mt-10">
              <DynamicBreadcrumb items={breadCrumbOptions} isTransparent />
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight mt-10">
                {currentService?.label}{" "}
                {currentService?.abbr ? `(${currentService.abbr})` : ""}
              </h1>
              <p className="mb-8 leading-relaxed text-lg text-white">
                {currentService?.detailedDesc?.details}
              </p>

              {filteredPackages.length > 0 && <ServiceFeatures />}
            </div>

            <div className="col-span-1 order-1 md:order-2 mt-10">
              <Card className="p-7">
                {availablePropertyTypes.length > 1 &&
                  !availablePropertyTypes.includes("NOT_APPLICABLE") && (
                    <div>
                      <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="mr-2">Select Property Type</span>
                      </h2>
                      <PropertyTypeCompo
                        propertyType={property_type}
                        availableTypes={availablePropertyTypes}
                      />
                    </div>
                  )}

                {filteredPackages.length > 0 && (
                  <>
                    <div className="space-y-6 mb-8 mt-5">
                      <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="mr-2">Choose Your Package</span>
                      </h2>

                      {filteredPackages.map((pack) => (
                        <PackageCard pack={pack} key={pack.id} />
                      ))}
                    </div>

                    <BookNowButtonCompo
                      siteSettings={siteSettings}
                      packages={filteredPackages}
                    />
                  </>
                )}

                {filteredPackages.length === 0 && (
                  <>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                      Customized {currentService?.label} Solutions
                    </h2>
                    <p className="text-gray-700 mb-6">
                      We offer tailored {currentService?.label.toLowerCase()}{" "}
                      solutions to meet your specific needs. Our expert team is
                      ready to provide you with a personalized quote and answer
                      any questions you may have.
                    </p>

                    <a href={`tel:${siteSettings?.phone1}`}>
                      <Button
                        size="lg"
                        className="w-full bg-primary hover:bg-primary-darker text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
                      >
                        <PhoneCall className="mr-2 h-5 w-5" />
                        Call for a Free Quote: {siteSettings?.phone1}
                      </Button>
                    </a>
                  </>
                )}
              </Card>
            </div>
          </div>
        </div>
      </section>

      <ServicePricingSection packages={allPackages} />

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h2 className="text-4xl font-bold text-center mb-10">
          {currentService?.pageContent?.title}
        </h2>

        {currentService?.pageContent?.html ? (
          <div
            suppressHydrationWarning
            dangerouslySetInnerHTML={{
              __html: currentService.pageContent.html,
            }}
            className="prose prose-lg mx-auto"
          />
        ) : null}

        <ServiceDetailsCta siteSettings={siteSettings} />

        <div className="my-20">
          <h2 className="text-3xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>
          {currentService?.faqs && currentService.faqs.length > 0 && (
            <Accordion type="single" collapsible className="w-full">
              {currentService.faqs.map((item) => (
                <AccordionItem key={item.ques} value={item.ques}>
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    {item.ques}
                  </AccordionTrigger>
                  <AccordionContent className="text-lg text-gray-700">
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
