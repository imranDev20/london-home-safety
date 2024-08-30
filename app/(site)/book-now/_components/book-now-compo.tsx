"use client";

import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import useOrderStore from "@/hooks/use-order-store";
import BackgroundImage from "@/images/hero-image-new.jpeg";
import { ALL_SERVICES } from "@/shared/data";
import { NavItem } from "@/types/misc";
import { Package, PropertyType } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const breadCrumbOptions = [
  {
    label: "Book Now",
    isCurrentPage: true,
  },
];

function mergeArrays(
  arr1: NavItem[],
  arr2: Package[],
  prop1: keyof NavItem,
  prop2: keyof Package
) {
  return arr1.map((item1) => {
    const matchingItems = arr2.filter((item2) => item2[prop2] === item1[prop1]);

    return {
      ...item1,
      packages: matchingItems,
    };
  });
}

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

export default function BookNowCompo({
  propertyType,
  packages,
}: {
  propertyType: PropertyType | null;
  packages: Package[];
}) {
  const [isCommercial, setIsCommercial] = useState<boolean>(false);
  const { cartItems, addItem } = useOrderStore();
  const router = useRouter();

  const handleAddToCart = (cartItem: {
    name: string;
    price: number;
    id: string;
  }) => {
    addItem(cartItem);
  };

  const isProductInCart = (id: string) => {
    return cartItems.some((item) => item.id === id);
  };

  useEffect(() => {
    if (propertyType === "COMMERCIAL") {
      setIsCommercial(true);
    } else {
      setIsCommercial(false);
    }
  }, [propertyType]);

  const mergedData = mergeArrays(
    ALL_SERVICES,
    packages,
    "label",
    "serviceName"
  );

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
            onCheckedChange={(e) => {
              setIsCommercial(e);

              if (e) {
                router.push("/book-now?property_type=COMMERCIAL", {
                  scroll: false,
                });
              } else {
                router.push("/book-now?property_type=RESIDENTIAL", {
                  scroll: false,
                });
              }
            }}
          />
          <Label htmlFor="property-type" className="text-2xl">
            Commercial
          </Label>
        </div>

        <div className="grid grid-cols-12 gap-7 mt-20 relative">
          <div className="col-span-9">
            {mergedData.map((service) => {
              if (service?.packages && service.packages.length > 0) {
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
                      {service.packages?.map((pack) => {
                        const productInCart = isProductInCart(pack.id);

                        return (
                          <Card
                            key={pack.id}
                            className={`p-5 flex flex-col justify-between items-center hover:shadow-lg transition-all`}
                          >
                            <div className="flex flex-col items-center">
                              <h3 className="text-xl font-semibold text-body-dark mb-2 mt-3 text-center">
                                {pack.name}
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
                                    isCommercial ? "Commercial" : "Residential"
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

              {mergedData.map((service) => {
                if (service?.packages && service.packages?.length > 0) {
                  return (
                    <Link
                      href={`/book-now/#${service.path.toString().slice(1)}`}
                      scroll
                      shallow
                      key={service.label}
                      onClick={(e) =>
                        smoothScroll(e, service.path.toString().slice(1))
                      }
                    >
                      <div className={`flex items-center my-3 px-5`}>
                        {service.Icon && (
                          <service.Icon height={24} width={24} />
                        )}
                        <h4 className={`font-medium ml-3 text-sm `}>
                          {service.label}
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
