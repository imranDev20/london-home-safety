"use client";

import React, { useMemo, useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import usePackageStore from "@/hooks/use-package-store";
import useOrderStore from "@/hooks/use-order-store";
import { Package } from "@prisma/client";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function PackageCard({ pack }: { pack: Package }) {
  const { selectedPackage, setPackage } = usePackageStore();
  const { cartItems, updateItem } = useOrderStore();
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const isInCart = useMemo(() => {
    return cartItems.some((item) => item.id === pack.id);
  }, [cartItems, pack.id]);

  const calculatedPrice = useMemo(() => {
    if (pack.isAdditionalPackage && pack.extraUnitPrice) {
      return (
        pack.price + (quantity - (pack.minQuantity ?? 1)) * pack.extraUnitPrice
      );
    }
    return pack.price;
  }, [pack, quantity]);

  useEffect(() => {
    setIsLoading(true);
    const cartItem = cartItems.find((item) => item.id === pack.id);

    if (cartItem) {
      setQuantity(cartItem.quantity);
    } else {
      setQuantity(pack.minQuantity || 1);
    }

    setIsLoading(false);
  }, [cartItems, pack.id, pack.minQuantity]);

  const handleQuantityChange = (newQuantity: number) => {
    const minQuantity = pack.minQuantity ?? 1;
    if (newQuantity < minQuantity) return;

    setQuantity(newQuantity);

    const newPrice =
      pack.isAdditionalPackage && pack.extraUnitPrice
        ? pack.price + (newQuantity - minQuantity) * pack.extraUnitPrice
        : pack.price;

    setPackage({
      ...pack,
      quantity: newQuantity,
      price: newPrice,
    });

    if (isInCart) {
      updateItem(pack.id, newQuantity, newPrice);
    }
  };

  const handlePackageSelection = () => {
    if (!isInCart) {
      setPackage({
        ...pack,
        quantity: pack.isAdditionalPackage ? quantity : pack.quantity,
        price: pack.isAdditionalPackage ? calculatedPrice : pack.price,
      });
    }
  };

  if (isLoading) {
    return (
      <Card className="overflow-hidden border-2 p-5">
        <div className="flex items-center">
          <Skeleton className="w-6 h-6 rounded-full mr-4" />
          <div className="flex-grow">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-8 w-1/2" />
          </div>
          <Skeleton className="w-20 h-8 ml-4" />
        </div>
      </Card>
    );
  }

  console.log(selectedPackage);

  return (
    <Card
      key={pack.id}
      className={cn(
        " overflow-hidden border-2 transition-all duration-200 relative",
        isInCart && !pack.isAdditionalPackage
          ? "border-gray-300 bg-gray-100 opacity-80"
          : "hover:border-primary",
        selectedPackage?.id === pack.id ? "border-primary" : ""
      )}
    >
      {isInCart && (
        <div className="absolute top-0 right-0 bg-secondary text-black text-xs font-semibold px-2 py-1 rounded-bl-md flex items-center">
          <ShoppingCart className="w-3 h-3 mr-1" />
          In Cart
        </div>
      )}
      <label
        htmlFor={pack.id}
        className={`flex items-center cursor-pointer p-5 transition-all duration-200 ease-in-out ${
          isInCart && !pack.isAdditionalPackage ? "pointer-events-none" : ""
        }`}
      >
        <div className="flex-shrink-0 mt-1">
          <input
            type="checkbox"
            name="packageOption"
            value={pack.id}
            checked={selectedPackage?.id === pack.id || isInCart}
            id={pack.id}
            className="sr-only peer"
            onChange={handlePackageSelection}
            disabled={isInCart && !pack.isAdditionalPackage}
          />
          <div
            className={`w-6 h-6 border-2 border-primary rounded-full mr-4 flex items-center justify-center peer-checked:bg-primary transition-all duration-200 ${
              isInCart && !pack.isAdditionalPackage
                ? "border-gray-400 bg-gray-200"
                : ""
            }`}
          ></div>
        </div>

        <div className="flex-grow">
          <p
            className={`text-lg font-semibold ${
              isInCart && !pack.isAdditionalPackage
                ? "text-gray-500"
                : "text-gray-900"
            }`}
          >
            {pack.name}
          </p>
          <p
            className={`text-sm mt-1 ${
              isInCart && !pack.isAdditionalPackage
                ? "text-gray-400"
                : "text-gray-600"
            }`}
          >
            {pack?.description ?? ""}
          </p>
          {pack.isAdditionalPackage && (
            <div className="mt-2 flex items-center">
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.preventDefault();
                  handleQuantityChange(quantity - 1);
                }}
                disabled={quantity <= (pack.minQuantity || 1)}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="mx-2 text-lg font-semibold">{quantity}</span>
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.preventDefault();
                  handleQuantityChange(quantity + 1);
                }}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
        <div
          className={`flex-shrink-0 text-xl font-bold ml-4 ${
            isInCart && !pack.isAdditionalPackage
              ? "text-gray-500"
              : "text-primary"
          }`}
        >
          £{calculatedPrice.toFixed(2)}
        </div>
      </label>
    </Card>
  );
}
