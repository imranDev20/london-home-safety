"use client";

import React, { useMemo, useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import usePackageStore from "@/hooks/use-package-store";
import useOrderStore from "@/hooks/use-order-store";
import { Package } from "@prisma/client";
import { Check, ShoppingCart } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function PackageCard({ pack }: { pack: Package }) {
  const { selectedPackage, setPackage } = usePackageStore();
  const { cartItems } = useOrderStore();
  const [quantity, setQuantity] = useState(1);
  const [currentPrice, setCurrentPrice] = useState(pack.price);

  const isInCart = useMemo(() => {
    return cartItems.some((item) => item.id === pack.id);
  }, [cartItems, pack.id]);
 
  useEffect(() => {
    if (selectedPackage?.id === pack.id && selectedPackage.minQuantity) {
      setQuantity(selectedPackage.minQuantity);
      calculatePrice(selectedPackage.minQuantity);
    }
  }, [selectedPackage, pack.id]);

  const calculatePrice = (newQuantity: number) => {
    if (!selectedPackage) return;
    
    const basePrice = selectedPackage.price;
    const minQuantity = selectedPackage.minQuantity ?? 1;
    const extraUnits = Math.max(0, newQuantity - minQuantity);
    const extraPrice = extraUnits * (selectedPackage.extraUnitPrice ?? 0);
    
    setCurrentPrice(basePrice + extraPrice);
  };
  const handleQuantityChange = (newValue: number) => {
    const minQuantity = selectedPackage?.minQuantity ?? 1;
    if (newValue >= minQuantity) {
      setQuantity(newValue);
      calculatePrice(newValue);
    }
  };

  return (
    <>
      <Card
        key={pack.id}
        className={`py-2.5 overflow-hidden border-2 transition-all hover:bg-gray-200 duration-200 relative ${
          isInCart
            ? "border-gray-300 bg-gray-100 opacity-80 cursor-not-allowed"
            : "hover:border-primary"
        }`}
      >
        {isInCart && (
          <div className="absolute top-0 right-0 bg-secondary text-black text-xs font-semibold px-2 py-1 rounded-bl-md flex items-center">
            <ShoppingCart className="w-3 h-3 mr-1" />
            Already in Cart
          </div>
        )}
        <label
          htmlFor={pack.id}
          className={`flex items-start cursor-pointer p-5 transition-all duration-200 ease-in-out ${
            isInCart ? "pointer-events-none" : ""
          }`}
        >
          <div className="flex-shrink-0 mt-1">
            <input
              type="radio"
              name="packageOption"
              value={pack.id}
              checked={selectedPackage?.id === pack.id}
              id={pack.id}
              className="sr-only peer"
              onChange={() => {
                if (!isInCart) {
                  setPackage(pack);
                }
              }}
              disabled={isInCart}
            />
            <div
              className={`w-6 h-6 border-2 border-primary rounded-full flex items-center justify-center peer-checked:bg-primary transition-all duration-200 ${
                isInCart ? "border-gray-400 bg-gray-200 bg-primary" : ""
              }`}
            >
              <Check
                className={`w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200 ${
                  isInCart ? "opacity-0" : ""
                }`}
              />
            </div>
          </div>
          <div className="flex-grow ml-4">
            <p
              className={`text-lg font-semibold ${
                isInCart ? "text-gray-500" : "text-gray-900"
              }`}
            >
              {pack.name}
            </p>
            <p
              className={`text-sm mt-1 ${
                isInCart ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {pack?.description ?? ""}
            </p>
          </div>
          <div
            className={`flex-shrink-0 text-xl font-bold ml-4 ${
              isInCart ? "text-gray-500" : "text-primary"
            }`}
          >
            £{pack.price.toFixed(2)}
          </div>
        </label>
      </Card>

      {selectedPackage?.id === pack.id && (
        <>
          <Separator />
          <Card className="flex justify-between py-2 px-4">
            <div className="flex items-center justify-between w-full bg-white rounded-lg p-2">
              <div
                className="flex items-stretch h-10 bg-gray-100 rounded-md overflow-hidden mr-4"
                style={{ width: "140px" }}
              >
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= (selectedPackage?.minQuantity ?? 1)}
                  className="flex-1 flex items-center justify-center text-gray-600 transition-colors duration-200 ease-in-out hover:bg-gray-200 active:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                >
                  <span className="text-sm font-medium select-none">−</span>
                </button>
                <input
                  type="number"
                  min={selectedPackage?.minQuantity ?? 1}
                  value={quantity}
                  onChange={(e) => {
                    const newValue = parseInt(e.target.value) || selectedPackage?.minQuantity || 1;
                    handleQuantityChange(newValue);
                  }}
                  className="w-12 text-center bg-transparent border-none focus:outline-none text-sm font-medium [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="flex-1 flex items-center justify-center text-gray-600 transition-colors duration-200 ease-in-out hover:bg-gray-200 active:bg-gray-300"
                >
                  <span className="text-sm font-medium select-none">+</span>
                </button>
              </div>
              <div
                className={`text-lg font-semibold ${
                  isInCart ? "text-gray-500" : "text-blue-600"
                }`}
              >
                £{currentPrice.toFixed(2)}
              </div>
            </div>
          </Card>
        </>
      )}
    </>
  );
}