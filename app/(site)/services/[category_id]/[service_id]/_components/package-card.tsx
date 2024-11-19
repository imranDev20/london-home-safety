"use client";

import React, { useMemo, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import usePackageStore from "@/hooks/use-package-store";
import useOrderStore from "@/hooks/use-order-store";
import { Package } from "@prisma/client";
import { Check, ShoppingCart, Plus, Minus } from "lucide-react";

export default function PackageCard({ pack }: { pack: Package }) {
  const { selectedPackage, setPackage } = usePackageStore();
  const { cartItems, updateItemQuantity, calculatePrice } = useOrderStore();
  const [isLoading, setIsLoading] = useState(true);

  const cartItem = useMemo(() => {
    return cartItems.find((item) => item.package.id === pack.id);
  }, [cartItems, pack.id]);

  const [quantity, setQuantity] = useState(pack.minQuantity ?? 0);

  useEffect(() => {
    setQuantity(cartItem?.quantity ?? pack.minQuantity ?? 0);
    setIsLoading(false);
  }, [cartItem, pack.minQuantity]);

  const currentPrice = useMemo(() => {
    return calculatePrice(pack, quantity);
  }, [calculatePrice, pack, quantity]);

  const handleQuantityChange = (newValue: number) => {
    const minQuantity = pack.minQuantity ?? 1;
    if (newValue < minQuantity) return;

    setQuantity(newValue);

    setPackage({
      id: pack.id,
      package: pack,
      quantity: newValue,
      price: calculatePrice(pack, newValue),
    });

    if (cartItem) {
      updateItemQuantity(pack.id, newValue);

      if (selectedPackage?.package.id === pack.id) {
        setPackage({
          ...selectedPackage,
          quantity: newValue,
          price: calculatePrice(pack, newValue),
        });
      }
    }
  };

  const handlePackageSelect = () => {
    if (cartItem) return;

    if (selectedPackage?.package.id === pack.id) {
      setPackage(null);
      return;
    }

    const newCartItem = {
      id: pack.id,
      package: pack,
      quantity,
      price: calculatePrice(pack, quantity),
    };

    setPackage(newCartItem);
  };

  if (isLoading) {
    return (
      <Card className="p-8">
        <div className="flex items-center gap-4">
          <Skeleton className="h-6 w-6 rounded-md" />
          <div className="flex-grow space-y-3">
            <div className="flex justify-between">
              <div className="space-y-2">
                <Skeleton className="h-6 w-[200px]" />
              </div>
              <Skeleton className="h-6 w-20" />
            </div>
            {pack.isAdditionalPackage && (
              <div className="flex items-center gap-4 pt-2">
                <Skeleton className="h-10 w-[200px]" />
              </div>
            )}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card
      className={`group relative overflow-hidden transition-all duration-300 ${
        cartItem
          ? "border-primary bg-primary/5"
          : "border hover:border-primary hover:shadow-lg"
      } ${!pack.isAdditionalPackage && cartItem ? "opacity-80" : ""}`}
    >
      {cartItem && (
        <div className="absolute top-0 right-0 bg-secondary text-black text-xs font-semibold px-2 py-1 rounded-bl-md flex items-center">
          <ShoppingCart className="w-3 h-3 mr-1" />
          In Cart{" "}
          {pack.isAdditionalPackage &&
            `(${cartItem.quantity} ${pack.unitType || "units"})`}
        </div>
      )}

      <label
        htmlFor={pack.id}
        className={`block cursor-pointer p-6 ${
          !pack.isAdditionalPackage && cartItem ? "cursor-not-allowed" : ""
        }`}
      >
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            <input
              type="checkbox"
              name="packageOption"
              value={pack.id}
              checked={
                selectedPackage?.package.id === pack.id ||
                cartItem?.package.id === pack.id
              }
              id={pack.id}
              className="sr-only peer"
              onChange={handlePackageSelect}
            />
            <div className="w-6 h-6 rounded-md border-2 border-primary flex items-center justify-center transition-all duration-300 group-hover:border-primary/80 peer-disabled:border-gray-200">
              <div
                className={`w-4 h-4 rounded transition-all duration-300 ${
                  cartItem || selectedPackage?.package.id === pack.id
                    ? "bg-primary scale-100"
                    : "bg-transparent scale-0"
                }`}
              />
              <Check
                className={`w-3.5 h-3.5 text-white absolute transition-all duration-300 ${
                  cartItem || selectedPackage?.package.id === pack.id
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-0"
                }`}
              />
            </div>
          </div>

          <div className="flex-grow space-y-3">
            <div className="flex justify-between items-start pt-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors duration-300">
                  {pack.name}
                </h3>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-primary">
                  £{currentPrice.toFixed(2)}
                </div>
                {pack.priceType === "FROM" && (
                  <span className="text-xs text-gray-500 font-medium">
                    starting from
                  </span>
                )}
              </div>
            </div>

            {pack.isAdditionalPackage && (
              <div className="flex items-center gap-4 pt-2">
                <span className="text-sm text-gray-600 font-medium whitespace-nowrap">
                  {pack.unitType ? `Quantity (${pack.unitType}):` : "Quantity:"}
                </span>
                <div className="relative flex items-stretch h-10 rounded-lg bg-gray-50/80 ring-1 ring-gray-200 p-1 hover:ring-primary/30 transition-all duration-200">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleQuantityChange(quantity - 1);
                    }}
                    disabled={quantity <= (pack.minQuantity ?? 1)}
                    className="w-9 flex items-center justify-center rounded-md text-primary hover:bg-white hover:shadow-sm transition-all duration-200 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:shadow-none"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <div className="relative">
                    <input
                      type="number"
                      min={pack.minQuantity ?? 1}
                      value={quantity}
                      onChange={(e) => {
                        const newValue =
                          parseInt(e.target.value) || pack.minQuantity || 1;
                        handleQuantityChange(newValue);
                      }}
                      className="w-12 h-full text-center bg-transparent font-medium text-primary [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-0 rounded-md transition-all duration-200"
                    />
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleQuantityChange(quantity + 1);
                    }}
                    className="w-9 flex items-center justify-center rounded-md text-primary hover:bg-white hover:shadow-sm transition-all duration-200"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </label>
    </Card>
  );
}
