"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import useOrderStore from "@/hooks/use-order-store";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ShoppingCart,
  ChevronRight,
  Check,
  Home,
  Building,
  Landmark,
  Users,
  Briefcase,
  Plus,
  Minus,
} from "lucide-react";
import { Package, PropertyType } from "@prisma/client";
import { cn, mergeArrays } from "@/lib/utils";
import { ALL_SERVICES } from "@/shared/data";

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
  {
    id: "HMO",
    label: "HMOs and Rental Houses",
    icon: Users,
    color: "text-purple-500",
  },
  {
    id: "BUSINESS_SECTOR",
    label: "Business Sectors",
    icon: Briefcase,
    color: "text-indigo-500",
  },
  {
    id: "COMMUNAL_AREA",
    label: "Communal Area",
    icon: Users,
    color: "text-pink-500",
  },
];

export default function BookNowPackages({ packages }: { packages: Package[] }) {
  const [propertyType, setPropertyType] = useState<PropertyType>("RESIDENTIAL");
  const { cartItems, addItem, updateItemQuantity, calculatePrice } =
    useOrderStore();
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  // Update quantities when cartItems change
  useEffect(() => {
    const updatedQuantities: { [key: string]: number } = {};
    cartItems.forEach((item) => {
      updatedQuantities[item.id] = item.quantity;
    });
    setQuantities((prev) => ({
      ...prev,
      ...updatedQuantities,
    }));
  }, [cartItems]);

  const handleAddToCart = (pack: Package) => {
    const quantity = quantities[pack.id] || pack.minQuantity || 1;
    addItem({
      id: pack.id,
      package: pack,
      quantity,
      price: calculatePrice(pack, quantity),
    });
  };

  const handleQuantityChange = (pack: Package, newQuantity: number) => {
    const minQuantity = pack.minQuantity || 1;
    if (newQuantity < minQuantity) return;

    setQuantities((prev) => ({ ...prev, [pack.id]: newQuantity }));

    const cartItem = cartItems.find((item) => item.id === pack.id);
    if (cartItem) {
      updateItemQuantity(pack.id, newQuantity);
    }
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
      <div className="flex items-center justify-center mb-12">
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
                    "block cursor-pointer rounded-lg border-2 bg-white p-4 transition-all duration-200",
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
            if (!service?.packages?.length) return null;

            return (
              <div
                key={service.label}
                className="mb-24"
                id={service.path.toString().slice(1)}
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
                    const cartItem = cartItems.find(
                      (item) => item.id === pack.id
                    );
                    const currentQuantity =
                      quantities[pack.id] || pack.minQuantity || 1;
                    const currentPrice = calculatePrice(pack, currentQuantity);

                    return (
                      <Card
                        key={pack.id}
                        className="flex flex-col justify-between shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <CardContent className="p-6 flex flex-col h-full items-center justify-between">
                          <div className="text-center flex flex-col">
                            <span className="text-center uppercase text-primary text-sm mb-4 rounded-lg">
                              {service.label}
                            </span>
                            <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
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

                            {pack.isAdditionalPackage && (
                              <div className="flex items-center justify-center mb-4">
                                <div className="relative flex items-stretch h-10 rounded-lg bg-gray-50/80 ring-1 ring-gray-200 p-1 hover:ring-primary/30 transition-all duration-200">
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleQuantityChange(
                                        pack,
                                        currentQuantity - 1
                                      );
                                    }}
                                    disabled={
                                      currentQuantity <= (pack.minQuantity ?? 1)
                                    }
                                    className="w-9 flex items-center justify-center rounded-md text-primary hover:bg-white hover:shadow-sm transition-all duration-200 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:shadow-none"
                                  >
                                    <Minus className="w-4 h-4" />
                                  </button>
                                  <div className="relative">
                                    <input
                                      type="number"
                                      min={pack.minQuantity ?? 1}
                                      value={currentQuantity}
                                      onChange={(e) => {
                                        const newValue =
                                          parseInt(e.target.value) ||
                                          pack.minQuantity ||
                                          1;
                                        handleQuantityChange(pack, newValue);
                                      }}
                                      className="w-12 h-full text-center bg-transparent font-medium text-primary [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-0 rounded-md transition-all duration-200"
                                    />
                                  </div>
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleQuantityChange(
                                        pack,
                                        currentQuantity + 1
                                      );
                                    }}
                                    className="w-9 flex items-center justify-center rounded-md text-primary hover:bg-white hover:shadow-sm transition-all duration-200"
                                  >
                                    <Plus className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            )}

                            <div className="flex justify-between items-center mb-4 flex-col">
                              <span className="text-sm font-medium text-gray-500 mb-2">
                                {pack.priceType === "FROM"
                                  ? "STARTS FROM"
                                  : "PRICE"}
                              </span>
                              <p className="text-3xl font-bold text-primary">
                                £{currentPrice.toFixed(2)}
                                {pack.isAdditionalPackage && (
                                  <span className="text-sm font-normal text-gray-500 ml-1">
                                    for {currentQuantity}{" "}
                                    {pack.unitType || "units"}
                                  </span>
                                )}
                              </p>
                            </div>

                            <Button
                              className="w-full py-5 font-semibold text-sm rounded-full bg-body-dark text-white hover:bg-secondary hover:text-black"
                              onClick={() => handleAddToCart(pack)}
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
                  if (!service?.packages?.length) return null;

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
                      {index < mergedData.length - 1 && <Separator />}
                    </Link>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
