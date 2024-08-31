import React from "react";
import Image from "next/image";
import PageHeader from "@/components/page-header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ALL_SERVICES } from "@/shared/data";
import { kebabCaseToNormalText } from "@/shared/function";
import { mergeArrays } from "@/lib/utils";
import ServiceDetailsCta from "./_components/service-details-cta";
import { getPackagesByService } from "./actions";
import { Button } from "@/components/ui/button";
import {
  Building,
  Check,
  Clock,
  DollarSign,
  Home,
  Shield,
  Star,
} from "lucide-react";
import { Card } from "@/components/ui/card";

export default async function ServiceDetailsPage({
  params: { service_id, category_id },
}: {
  params: { service_id: string; category_id: string };
}) {
  const currentServiceWithoutPackage = ALL_SERVICES.find((service) =>
    service.path.includes(service_id)
  );

  const packages = await getPackagesByService(
    currentServiceWithoutPackage?.label ?? ""
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
    { label: "Services", path: "/services" },
    {
      label: kebabCaseToNormalText(category_id),
      path: `/services/${category_id}`,
    },
    { label: kebabCaseToNormalText(service_id), isCurrentPage: true },
  ];

  return (
    <>
      <div className="flex flex-col md:flex-row min-h-[600px]">
        <div className="relative w-full md:w-1/2 h-[300px] md:h-auto md:min-h-[600px]">
          {currentService?.image ? (
            <Image
              src={currentService.image}
              alt={currentService.label}
              layout="fill"
              objectFit="cover"
              className="absolute inset-0"
            />
          ) : (
            <div className="w-full md:w-1/2 bg-white p-8 md:p-12 lg:p-16 flex flex-col justify-between">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  {currentService?.label}
                </h1>
                <p className="text-gray-700 mb-8 leading-relaxed text-lg">
                  {currentService?.description}
                </p>

                <div className="grid grid-cols-2 gap-6 mb-10">
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

              <div className="space-y-4 mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Choose Your Package
                </h2>
                {currentService?.packages.map((pack) => (
                  <Card
                    key={pack.id}
                    className="overflow-hidden border-2 transition-all duration-200 hover:border-blue-500"
                  >
                    <label
                      htmlFor={pack.id}
                      className="flex items-center cursor-pointer p-5 transition-all duration-200 ease-in-out hover:bg-gray-50"
                    >
                      <input
                        type="radio"
                        name="packageOption"
                        value={pack.id}
                        id={pack.id}
                        className="sr-only peer"
                      />
                      <div className="w-6 h-6 border-2 border-blue-600 rounded-full mr-4 flex items-center justify-center peer-checked:bg-blue-600 transition-all duration-200">
                        <Check className="w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200" />
                      </div>
                      <div className="flex-grow">
                        <p className="text-lg font-semibold text-gray-900">
                          {pack.name}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {pack?.description ?? "Standard package description"}
                        </p>
                      </div>
                      <div className="text-xl font-bold text-blue-600 ml-4">
                        £{pack.price}
                      </div>
                    </label>
                  </Card>
                ))}
              </div>

              <Button className="w-full py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center group">
                <span className="mr-2">Book Now</span>
                <svg
                  className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Button>
            </div>
          )}
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"></div>
        </div>

        <div className="w-full md:w-1/2 bg-white p-8 md:p-12 lg:p-16 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {currentService?.label}
            </h1>
            <p className="text-gray-700 mb-8 leading-relaxed text-lg">
              {currentService?.description}
            </p>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="mr-2">Select Property Type</span>
              </h2>

              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  className="flex-1 py-6 flex flex-col items-center justify-center hover:bg-blue-50 hover:border-blue-500 transition-all duration-200 h-auto"
                >
                  <div>
                    <Home className="w-8 h-8 mb-2" />
                  </div>
                  <span>Residential</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 py-6 flex flex-col items-center justify-center hover:bg-blue-50 hover:border-blue-500 transition-all duration-200 h-auto"
                >
                  <div>
                    <Building className="w-8 h-8 mb-2" />
                  </div>

                  <span>Commercial</span>
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="mr-2">Choose Your Package</span>
            </h2>

            {currentService?.packages.map((pack) => (
              <Card
                key={pack.id}
                className="overflow-hidden border-2 transition-all duration-200 hover:border-blue-500"
              >
                <label
                  htmlFor={pack.id}
                  className="flex items-center cursor-pointer p-5 transition-all duration-200 ease-in-out hover:bg-gray-50"
                >
                  <input
                    type="radio"
                    name="packageOption"
                    value={pack.id}
                    id={pack.id}
                    className="sr-only peer"
                  />
                  <div className="w-6 h-6 border-2 border-blue-600 rounded-full mr-4 flex items-center justify-center peer-checked:bg-blue-600 transition-all duration-200">
                    <Check className="w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200" />
                  </div>
                  <div className="flex-grow">
                    <p className="text-lg font-semibold text-gray-900">
                      {pack.name}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {pack?.description ?? "Standard package description"}
                    </p>
                  </div>
                  <div className="text-xl font-bold text-blue-600 ml-4">
                    £{pack.price}
                  </div>
                </label>
              </Card>
            ))}
          </div>

          <Button
            size="lg"
            className="w-full py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center group"
          >
            <span className="mr-2">Book Now</span>
            <svg
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Button>

          <div className="grid grid-cols-2 gap-6 mt-10">
            <div className="flex items-center bg-blue-50 p-4 rounded-lg">
              <Clock className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <h3 className="font-semibold text-gray-900">Quick Service</h3>
                <p className="text-sm text-gray-600">Fast turnaround time</p>
              </div>
            </div>
            <div className="flex items-center bg-green-50 p-4 rounded-lg">
              <Shield className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <h3 className="font-semibold text-gray-900">100% Guaranteed</h3>
                <p className="text-sm text-gray-600">Satisfaction assured</p>
              </div>
            </div>
            <div className="flex items-center bg-purple-50 p-4 rounded-lg">
              <Star className="w-8 h-8 text-purple-600 mr-3" />
              <div>
                <h3 className="font-semibold text-gray-900">
                  Expert Technicians
                </h3>
                <p className="text-sm text-gray-600">Skilled professionals</p>
              </div>
            </div>
            <div className="flex items-center bg-yellow-50 p-4 rounded-lg">
              <DollarSign className="w-8 h-8 text-yellow-600 mr-3" />
              <div>
                <h3 className="font-semibold text-gray-900">
                  Competitive Pricing
                </h3>
                <p className="text-sm text-gray-600">Best value for money</p>
              </div>
            </div>
          </div>
        </div>
      </div>

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
