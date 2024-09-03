import React from "react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ALL_SERVICES } from "@/shared/data";
import { kebabToNormal } from "@/lib/utils";
import { mergeArrays } from "@/lib/utils";
import ServiceDetailsCta from "./_components/service-details-cta";
import { getPackagesByService } from "./actions";
import { Clock, DollarSign, Shield, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import PackageCard from "./_components/package-card";
import { PropertyType } from "@prisma/client";
import BookNowButtonCompo from "./_components/book-now-button-compo";
import BackgroundImage from "@/images/hero-image-new.jpeg";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import PropertyTypeCompo from "./_components/property-type";
import ServicePricingSection from "./_components/service-pricing";

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

  const packages = await getPackagesByService(
    currentServiceWithoutPackage?.label ?? "",
    property_type ?? "RESIDENTIAL"
  );

  const allPackages = await getPackagesByService(
    currentServiceWithoutPackage?.label ?? "",
    "ALL"
  );

  if (!packages) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        No packages available
      </div>
    );
  }

  const mergedData = mergeArrays(
    ALL_SERVICES,
    packages,
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

  return (
    <>
      <section className="relative -mt-[65px]">
        <Image
          src={BackgroundImage}
          alt="Background"
          sizes="100vw"
          fill
          priority
          placeholder="blur"
          className="object-cover"
        />
        <div className="relative py-20 before:content-[''] before:absolute before:inset-0 before:bg-[#062C64] before:opacity-90 before:mix-blend-multiply">
          <div className="container mx-auto pt-[65px] max-w-screen-xl grid grid-cols-2 gap-10 px-4 md:px-8 lg:px-16 relative z-10">
            <div className="col-span-2 md:col-span-1 ">
              <DynamicBreadcrumb items={breadCrumbOptions} isTransparent />
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight mt-10">
                {currentService?.label}
              </h1>
              <p className="mb-8 leading-relaxed text-lg text-white">
                {currentService?.detailedDesc?.details}
              </p>

              <div className="hidden md:grid grid-cols-2 gap-6 mt-10 ">
                <div className="flex items-center bg-blue-50 p-4 rounded-lg">
                  <Clock className="w-8 h-8 text-blue-600 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Quick Service
                    </h3>
                    <p className="text-sm text-gray-600">
                      Fast turnaround time
                    </p>
                  </div>
                </div>
                <div className="flex items-center bg-green-50 p-4 rounded-lg">
                  <Shield className="w-8 h-8 text-green-600 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      100% Guaranteed
                    </h3>
                    <p className="text-sm text-gray-600">
                      Satisfaction assured
                    </p>
                  </div>
                </div>
                <div className="flex items-center bg-purple-50 p-4 rounded-lg">
                  <Star className="w-8 h-8 text-purple-600 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Expert Technicians
                    </h3>
                    <p className="text-sm text-gray-600">
                      Skilled professionals
                    </p>
                  </div>
                </div>
                <div className="flex items-center bg-yellow-50 p-4 rounded-lg">
                  <DollarSign className="w-8 h-8 text-yellow-600 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Competitive Pricing
                    </h3>
                    <p className="text-sm text-gray-600">
                      Best value for money
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-2 md:col-span-1">
              <Card className="p-7">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">Select Property Type</span>
                </h2>

                <PropertyTypeCompo propertyType={property_type} />

                <div className="space-y-6 mb-8 mt-5">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="mr-2">Choose Your Package</span>
                  </h2>

                  {currentService?.packages.map((pack) => (
                    <PackageCard pack={pack} key={pack.id} />
                  ))}
                </div>

                <BookNowButtonCompo />
              </Card>
            </div>
          </div>
        </div>
      </section>

      <ServicePricingSection
        commercialPackages={allPackages.filter(
          (p) => p.propertyType === "COMMERCIAL"
        )}
        residentialPackages={allPackages.filter(
          (p) => p.propertyType === "RESIDENTIAL"
        )}
      />

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h2 className="text-4xl font-bold text-center mb-10">
          {currentService?.pageContent?.title}
        </h2>

        {currentService?.pageContent?.html && (
          <div
            dangerouslySetInnerHTML={{
              __html: currentService.pageContent.html,
            }}
            className="prose prose-lg mx-auto "
          />
        )}

        <ServiceDetailsCta />

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
