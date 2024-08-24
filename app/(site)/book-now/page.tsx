"use client";

import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import useCartStore from "@/hooks/use-cart-store";
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
  const { items, addItem, removeItem, clearCart } = useCartStore();
  const [activeSection, setActiveSection] = useState("");

  const handleAddToCart = (cartItem: {
    name: string;
    price: number;
    id: string;
  }) => {
    addItem(cartItem);
  };

  const isProductInCart = (id: string) => {
    return items.some((item) => item.id === id);
  };

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

        <div className="grid grid-cols-12 gap-7 mt-20 relative">
          <div className="col-span-9">
            {ALL_SERVICES.map((service) => {
              const pricingArray = service.pricingDetails
                ? isCommercial
                  ? service?.pricingDetails[1]
                  : service?.pricingDetails[0]
                : null;

              if (pricingArray?.packages && pricingArray.packages.length > 0) {
                return (
                  <div
                    key={service.label}
                    className="mb-16"
                    id={`${service.path.toString().slice(1)}`}
                  >
                    <h2 className="text-left mb-10 text-3xl sm:text-2xl font-bold capitalize">
                      {service.label}
                    </h2>

                    <div className="grid grid-cols-3 gap-5 auto-rows-fr">
                      {pricingArray &&
                        pricingArray.packages?.map((pack) => {
                          const productInCart = isProductInCart(pack.id);
                          return (
                            <Card
                              key={pack.id}
                              className={`p-5 flex flex-col justify-between items-center hover:shadow-lg transition-all`}
                            >
                              <div className="flex flex-col items-center">
                                <h3 className="text-xl font-semibold text-body-dark mb-2 mt-3 text-center">
                                  {`${
                                    isCommercial ? "Commercial" : "Residential"
                                  } ${pack.name}`}
                                </h3>

                                {pack.price ? (
                                  <p className="text-body text-sm mt-2">
                                    Starts From
                                  </p>
                                ) : null}

                                {pack.price ? (
                                  <p className="text-primary font-bold text-2xl mb-4">
                                    £{pack.price}
                                  </p>
                                ) : null}
                              </div>
                              <Button
                                className="w-full mt-4 bg-secondary text-black font-semibold hover:bg-primary hover:text-white transition-colors duration-300"
                                onClick={() => {
                                  handleAddToCart({
                                    id: pack.id,
                                    name: `${
                                      isCommercial
                                        ? "Commercial"
                                        : "Residential"
                                    } ${pack.name}`,
                                    price: pack.price,
                                  });
                                }}
                                disabled={productInCart}
                              >
                                {productInCart ? "Added to Cart" : "Order Now"}
                              </Button>
                            </Card>
                          );
                        })}
                    </div>
                  </div>
                );
              }
            })}
          </div>

          <div className="col-span-3 relative h-full">
            <Card className="sticky top-2">
              <CardHeader className="py-4">
                <h4 className="text-xl font-semibold">Quick Links</h4>
              </CardHeader>
              <Separator />

              {ALL_SERVICES.map((item) => {
                const pricingArray = item.pricingDetails
                  ? isCommercial
                    ? item?.pricingDetails[1]
                    : item?.pricingDetails[0]
                  : null;

                if (
                  pricingArray?.packages &&
                  pricingArray.packages?.length > 0
                ) {
                  return (
                    <Link
                      href={`/book-now/#${item.path.toString().slice(1)}`}
                      scroll
                      shallow
                      key={item.label}
                      onClick={(e) =>
                        smoothScroll(e, item.path.toString().slice(1))
                      }
                    >
                      <div
                        className={`flex items-center my-3 px-5 ${
                          activeSection === item.path.toString().slice(1)
                            ? "bg-secondary"
                            : ""
                        }`}
                      >
                        {item.Icon && <item.Icon height={48} width={48} />}
                        <h4
                          className={`font-medium ml-3 text-sm ${
                            activeSection === item.path.toString().slice(1)
                              ? "text-primary"
                              : ""
                          }`}
                        >
                          {item.label}
                        </h4>
                      </div>
                      <Separator />
                    </Link>
                  );
                }
              })}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
