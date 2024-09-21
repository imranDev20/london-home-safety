"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useOrderStore from "@/hooks/use-order-store";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  ShoppingCart,
  ChevronRight,
  Check,
  Home,
  Building,
  Landmark,
} from "lucide-react";
import { Package, PropertyType } from "@prisma/client";
import { cn, mergeArrays } from "@/lib/utils";
import { ALL_SERVICES } from "@/shared/data";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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

interface PropertyTypeOption {
  id: PropertyType;
  label: string;
  icon: React.ElementType;
  color: string;
}

const propertyTypeOptions: PropertyTypeOption[] = [
  {
    id: "RESIDENTIAL",
    label: "Residential Property",
    icon: Home,
    color: "text-blue-500",
  },
  {
    id: "COMMERCIAL",
    label: "Commercial Property",
    icon: Building,
    color: "text-green-500",
  },
  {
    id: "NOT_APPLICABLE",
    label: "Other Properties",
    icon: Landmark,
    color: "text-orange-500",
  },
];

export default function BookNowPackages({ packages }: { packages: Package[] }) {
  const [propertyType, setPropertyType] = useState<PropertyType>("RESIDENTIAL");
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

  const mergedData = useMemo(
    () => mergeArrays(ALL_SERVICES, packages, "label", "serviceName"),
    [packages]
  );

  const filteredData = useMemo(
    () =>
      mergedData
        .map((service) => ({
          ...service,
          packages: service.packages?.filter(
            (pack) => pack.propertyType === propertyType
          ),
        }))
        .filter((service) => service.packages && service.packages.length > 0),
    [mergedData, propertyType]
  );

  return (
    <>
      <div className="flex items-center justify-center mb-12 transition-all">
        <Card className="p-6 mb-8 w-full max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold mb-6 text-center">
            Select Property Type
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {propertyTypeOptions.map((option) => (
              <div key={option.id}>
                <label
                  htmlFor={option.id}
                  className={cn(
                    "block cursor-pointer rounded-lg border-2 bg-white p-4 transition-all duration-200 ease-in-out",
                    propertyType === option.id
                      ? "border-blue-500 shadow-md"
                      : "border-gray-200 hover:border-blue-300"
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <option.icon className={cn("w-8 h-8", option.color)} />
                    <div
                      className={cn(
                        "w-4 h-4 rounded-full border-2",
                        propertyType === option.id
                          ? "bg-blue-500 border-blue-500"
                          : "border-gray-300"
                      )}
                    />
                  </div>
                  <p className="text-gray-800 font-medium">{option.label}</p>
                  <input
                    type="radio"
                    name="propertyType"
                    value={option.id}
                    id={option.id}
                    className="sr-only"
                    checked={propertyType === option.id}
                    onChange={() => setPropertyType(option.id)}
                  />
                </label>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-9">
          {filteredData.map((service) => {
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
                          <CardContent className="p-6 flex flex-col h-full items-center justify-between">
                            <div className="text-center flex flex-col">
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
                            </div>

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
                                className={`w-full py-5 font-semibold text-sm transition-all duration-300 rounded-full bg-body-dark text-white hover:bg-secondary hover:text-black`}
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
                {filteredData.map((service, index) => {
                  if (service?.packages && service.packages?.length > 0) {
                    return (
                      <Link
                        href={`/book-now/#${service.path.toString().slice(1)}`}
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
    </>
  );
}
