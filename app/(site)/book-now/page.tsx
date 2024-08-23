"use client";

import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import BackgroundImage from "@/images/hero-image-new.jpeg";
import { ALL_SERVICES } from "@/shared/data";
import Link from "next/link";
import { useState } from "react";

const breadCrumbOptions = [
  {
    label: "Book Now",
    isCurrentPage: true,
  },
];

const smoothScroll = (
  e: React.MouseEvent<HTMLAnchorElement>,
  targetId: string
) => {
  e.preventDefault();
  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: "smooth" });
  }
};

export default function BookNow() {
  const [isCommercial, setIsCommercial] = useState<boolean>(false);

  return (
    <div className="bg-section-background">
      <PageHeader
        backgroundImage={BackgroundImage}
        breadCrumbOptions={breadCrumbOptions}
      />

      <div className="container mx-auto max-w-screen-xl px-16">
        <h1 className="text-center mb-10 text-3xl sm:text-4xl font-bold capitalize mt-10">
          Book some services example title
        </h1>

        <div className="flex items-center space-x-2 justify-center gap-4">
          <Label htmlFor="property-type" className="text-2xl">
            Residential
          </Label>
          <Switch
            id="property-type"
            className=" scale-125"
            checked={isCommercial}
            onCheckedChange={(e) => setIsCommercial(e)}
          />
          <Label htmlFor="property-type" className="text-2xl">
            Commercial
          </Label>
        </div>

        <div className="grid grid-cols-12 gap-7 mt-20">
          <div className="col-span-9">
            {ALL_SERVICES.map((service) => {
              const pricingArray = service.pricingDetails
                ? isCommercial
                  ? service?.pricingDetails[1]
                  : service?.pricingDetails[0]
                : null;

              return (
                <div key={service.label} className="mb-16">
                  <h2
                    id={`${service.path.toString().slice(1)}`}
                    className="text-left mb-10 text-3xl sm:text-2xl font-bold capitalize"
                  >
                    {service.label}
                  </h2>

                  <div className="grid grid-cols-3 gap-5 auto-rows-fr">
                    {pricingArray &&
                      pricingArray.packages?.map((pack) => (
                        <Card
                          key={pack.name}
                          className={`p-5 flex flex-col justify-between items-center hover:shadow-lg transition-all`}
                        >
                          <div className="flex flex-col items-center">
                            {/* {service.Icon ? <service.Icon /> : <EpcIcon />} */}

                            <h3 className="text-xl font-semibold text-body-dark mb-2 mt-3 text-center">
                              {`${
                                isCommercial ? "Commercial" : "Residential"
                              } ${pack.name}`}
                            </h3>
                            <p className="text-body text-sm mt-2">
                              Starts From
                            </p>
                            {pack.price && (
                              <p className="text-primary font-bold text-2xl mb-4">
                                £{pack.price}
                              </p>
                            )}
                          </div>
                          <Button className="w-full mt-4 bg-secondary text-black font-semibold hover:bg-primary hover:text-white transition-colors duration-300">
                            Order Now
                          </Button>
                        </Card>
                      ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="col-span-3">
            <Card>
              <CardHeader className="py-4">
                <h4 className="text-xl font-semibold">Quick Links</h4>
              </CardHeader>
              <Separator />

              {ALL_SERVICES.map((item) => (
                <Link
                  href={`/book-now/#${item.path.toString().slice(1)}`}
                  scroll
                  shallow
                  key={item.label}
                  onClick={(e) =>
                    smoothScroll(e, item.path.toString().slice(1))
                  }
                >
                  <div className="flex items-center my-3 px-5">
                    {item.Icon && <item.Icon height={48} width={48} />}
                    <h4 className="font-medium ml-3 text-sm">{item.label}</h4>
                  </div>
                  <Separator />
                </Link>
              ))}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
