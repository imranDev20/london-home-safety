"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Package, PropertyType } from "@prisma/client";
import { ALL_SERVICES } from "@/shared/data";
import useOrderStore from "@/hooks/use-order-store";
import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  ShoppingCart,
  ChevronRight,
  Check,
  Tag,
  Home,
  Building,
  Briefcase,
  Clock,
  Zap,
  Flame,
  Shield,
} from "lucide-react";
import BackgroundImage from "@/images/hero-image-new.jpeg";
import { mergeArrays } from "@/lib/utils";

const breadCrumbOptions = [{ label: "Book Now", isCurrentPage: true }];

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

export default function BookNowComponent({
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
    description: string;
  }) => {
    addItem(cartItem);
  };

  const isProductInCart = (id: string) =>
    cartItems.some((item) => item.id === id);

  useEffect(() => {
    setIsCommercial(propertyType === "COMMERCIAL");
  }, [propertyType]);

  const mergedData = mergeArrays(
    ALL_SERVICES,
    packages,
    "label",
    "serviceName"
  );

  return (
    <div className="bg-gray-50">
      <PageHeader
        backgroundImage={BackgroundImage}
        breadCrumbOptions={breadCrumbOptions}
      />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-center mb-16 text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
          Book Your Professional
          <span className="text-primary block mt-2 relative">
            Safety Services Today
            <svg
              className="absolute w-full h-3 -bottom-2 left-0 text-primary opacity-30"
              viewBox="0 0 200 9"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="currentColor"
                d="M0,7 C50,9 100,4 150,6 L200,7 L200,9 L0,9 Z"
              />
            </svg>
          </span>
        </h1>

        <div className="flex items-center justify-center space-x-6 mb-12 transition-all">
          <Label
            htmlFor="property-type"
            className="text-lg font-semibold text-gray-800"
          >
            Residential
          </Label>
          <Switch
            id="property-type"
            checked={isCommercial}
            onCheckedChange={(e) => {
              setIsCommercial(e);
              router.push(
                `/book-now?property_type=${e ? "COMMERCIAL" : "RESIDENTIAL"}`,
                { scroll: false }
              );
            }}
            className="scale-125 transition-transform duration-300 hover:scale-130"
          />
          <Label
            htmlFor="property-type"
            className="text-lg font-semibold text-gray-800"
          >
            Commercial
          </Label>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-9">
            {mergedData.map((service) => {
              if (service?.packages && service.packages.length > 0) {
                return (
                  <div
                    key={service.label}
                    className="mb-24"
                    id={`${service.path.toString().slice(1)}`}
                  >
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                      {service.Icon && (
                        <service.Icon height={54} width={54} className="mr-2" />
                      )}
                      {service.label}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {service.packages?.map((pack) => {
                        const productInCart = isProductInCart(pack.id);

                        return (
                          <Card
                            key={pack.id}
                            className="flex flex-col justify-between shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden bg-white border border-gray-200 tracking-wider"
                          >
                            <CardContent className="p-6 flex flex-col h-full items-center">
                              <span className="text-center uppercase text-primary text-sm mb-4 rounded-lg">
                                {service.label}
                              </span>
                              <h3 className="text-xl font-bold text-gray-900 transition-colors duration-300 mb-2 text-center">
                                {pack.name}
                              </h3>

                              {pack.description && (
                                <p className="text-sm text-gray-600 mb-4 flex-grow">
                                  {pack.description}
                                </p>
                              )}

                              <div className="w-full mt-4">
                                <Separator className="my-4" />

                                <div className="flex justify-between items-center mb-4 flex-col">
                                  <span className="text-sm font-medium text-gray-500 mb-2">
                                    STARTS FROM
                                  </span>
                                  <p className="text-3xl font-bold text-primary">
                                    £{pack.price.toFixed(2)}
                                  </p>
                                </div>

                                <Button
                                  className={`w-full py-3 font-semibold text-sm transition-all duration-300 rounded-md ${
                                    productInCart
                                      ? "bg-green-500 hover:bg-green-600 text-white"
                                      : "bg-body-dark text-white hover:bg-primary hover:text-white"
                                  }`}
                                  onClick={() =>
                                    handleAddToCart({
                                      id: pack.id,
                                      name: `${pack.propertyType} ${pack.name}`,
                                      price: pack.price,
                                      description:
                                        pack.description ||
                                        "Package description",
                                    })
                                  }
                                  disabled={productInCart}
                                >
                                  <span className="flex items-center justify-center">
                                    {productInCart ? (
                                      <>
                                        <Check className="mr-2 h-4 w-4" />
                                        Added to Cart
                                      </>
                                    ) : (
                                      <>
                                        <ShoppingCart className="mr-2 h-4 w-4" />
                                        Add to Cart
                                      </>
                                    )}
                                  </span>
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>

          <div className="lg:col-span-3">
            <div className="sticky top-4">
              <Card>
                <CardHeader className="py-4">
                  <h4 className="text-xl font-semibold text-gray-900">
                    Explore by Categories
                  </h4>
                </CardHeader>
                <Separator />
                <CardContent className="py-2 p-0">
                  {mergedData.map((service, index) => {
                    if (service?.packages && service.packages?.length > 0) {
                      return (
                        <Link
                          href={`/book-now/#${service.path
                            .toString()
                            .slice(1)}`}
                          key={service.label}
                          onClick={(e) =>
                            smoothScroll(e, service.path.toString().slice(1))
                          }
                          className="block"
                        >
                          <div className="flex items-center justify-between py-3 px-4 hover:bg-gray-100 rounded-md transition-colors duration-200">
                            <div className="flex items-center">
                              {service.Icon && (
                                <service.Icon
                                  height={48}
                                  width={48}
                                  className="mr-2 min-w-[48px]"
                                />
                              )}
                              <span className="font-medium text-base text-gray-700">
                                {service.label}
                              </span>
                            </div>
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                          </div>

                          {mergedData.length - 1 !== index && <Separator />}
                        </Link>
                      );
                    }
                    return null;
                  })}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
