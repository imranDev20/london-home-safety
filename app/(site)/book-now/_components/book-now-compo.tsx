"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Package, PropertyType } from "@prisma/client";
import { NavItem } from "@/types/misc";
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
        <h1 className="text-center mb-10 text-3xl sm:text-4xl font-bold text-gray-900">
          Book Your Professional Services
        </h1>

        <div className="flex items-center justify-center space-x-4 mb-12">
          <Label
            htmlFor="property-type"
            className="text-lg font-medium text-gray-700"
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
            className="scale-110"
          />
          <Label
            htmlFor="property-type"
            className="text-lg font-medium text-gray-700"
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
                    className="mb-16"
                    id={`${service.path.toString().slice(1)}`}
                  >
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      {service.Icon && (
                        <service.Icon className="mr-2 h-6 w-6 text-primary" />
                      )}
                      {service.label}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {service.packages?.map((pack) => {
                        const productInCart = isProductInCart(pack.id);

                        return (
                          <Card
                            key={pack.id}
                            className="flex flex-col justify-between hover:shadow-lg transition-all overflow-hidden relative group"
                          >
                            <CardContent className="p-6">
                              <div className="absolute top-2 right-2">
                                {pack.propertyType === "RESIDENTIAL" ? (
                                  <Home className="h-5 w-5 text-blue-500" />
                                ) : (
                                  <Building className="h-5 w-5 text-orange-500" />
                                )}
                              </div>

                              <div className="flex flex-col mb-4">
                                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors duration-300">
                                  {pack.name}
                                </h3>
                              </div>

                              <div className="mb-4 flex justify-between items-center">
                                <p className="text-3xl font-bold text-primary">
                                  £{pack.price}
                                </p>
                              </div>

                              {pack.description && (
                                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                  {pack.description}
                                </p>
                              )}

                              <Button
                                className={`w-full mt-2 font-semibold transition-colors duration-300 ${
                                  productInCart
                                    ? "bg-green-500 hover:bg-green-600 text-white"
                                    : "bg-primary hover:bg-primary-dark text-white"
                                }`}
                                onClick={() =>
                                  handleAddToCart({
                                    id: pack.id,
                                    name: `${pack.propertyType} ${pack.name}`,
                                    price: pack.price,
                                    description:
                                      pack.description || "Package description",
                                  })
                                }
                                disabled={productInCart}
                              >
                                <span className="flex items-center justify-center">
                                  {productInCart ? (
                                    <>
                                      <ShoppingCart className="mr-2 h-5 w-5" />
                                      Added to Cart
                                    </>
                                  ) : (
                                    <>
                                      <ShoppingCart className="mr-2 h-5 w-5" />
                                      Add to Cart
                                    </>
                                  )}
                                </span>
                              </Button>
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
                    Quick Links
                  </h4>
                </CardHeader>
                <Separator />
                <CardContent className="py-2">
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
                                <service.Icon className="h-5 w-5 text-primary mr-3" />
                              )}
                              <span className="font-medium text-sm text-gray-700">
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
