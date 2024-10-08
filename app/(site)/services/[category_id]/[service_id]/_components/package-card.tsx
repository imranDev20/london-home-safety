"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import useOrderStore from "@/hooks/use-order-store";
import usePackageStore from "@/hooks/use-package-store";
import { Package } from "@prisma/client";
import { Check, ShoppingCart } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function PackageCard({ pack }: { pack: Package }) {
  const { selectedPackage, setPackage } = usePackageStore();
  const { cartItems } = useOrderStore();
  const [quantity, setQuantity] = useState(1);

  const [currentPrice, setCurrentPrice] = useState(pack.price);

  const isInCart = useMemo(() => {
    return cartItems.some((item) => item.id === pack.id);
  }, [cartItems, pack.id]);

  const calculatePrice = useCallback(
    (newQuantity: number) => {
      if (!selectedPackage) return pack.price;

      const basePrice = selectedPackage.price;
      const minQuantity = selectedPackage.minQuantity ?? 1;
      const extraUnits = Math.max(0, newQuantity - minQuantity);
      const extraPrice = extraUnits * (selectedPackage.extraUnitPrice ?? 1);
      return basePrice + extraPrice;
    },
    [selectedPackage, pack.price]
  );
  const existingInCartQuantity =
  cartItems.find((item) => item.id === pack.id)?.quantity ?? 1;
  const existingInCartPrice =
      cartItems.find((item) => item.id === pack.id)?.price ?? 1;
  useEffect(() => {
    const existingInCartQuantity =
      cartItems.find((item) => item.id === pack.id)?.quantity ?? 1;
    if (pack?.isAdditionalPackage && pack.minQuantity) {
      setQuantity(isInCart ? existingInCartQuantity : pack.minQuantity ?? 1);
      calculatePrice(pack.minQuantity);
    }
  }, [
    cartItems,
    isInCart,
    pack.minQuantity,
    pack?.isAdditionalPackage,
    pack.id,
    calculatePrice,
    selectedPackage,
  ]);
  const updatePackage = useCallback(
    (newQuantity: number, newPrice: number) => {
      if (selectedPackage && selectedPackage.id === pack.id) {
        setPackage({
          ...pack,
          price: pack.isAdditionalPackage ? newPrice : pack.price,
          quantity: newQuantity,
        });
      }
    },
    [pack, selectedPackage, setPackage]
  );

  const handleQuantityChange = useCallback(
    (newValue: number) => {
      const minQuantity = pack.minQuantity ?? 1;
      if (newValue >= minQuantity) {
        setQuantity(newValue);
        const newPrice = calculatePrice(newValue);
        setCurrentPrice(newPrice);
        updatePackage(newValue, newPrice);
      }
    },
    [pack.minQuantity, calculatePrice, updatePackage]
  );

  // Modify calculatePrice to return the new price

  // console.log(`selectedPackage`, selectedPackage);

  return (
    <>
      <Card
        key={pack.id}
        className={`py-2.5 overflow-hidden border-2 transition-all hover:bg-[#E8F2FB] duration-200 relative ${
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
          className={`flex items-start cursor-pointer p-5 transition-all duration-200 ease-in-out `}
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
                  setPackage({
                    ...pack,
                    price: selectedPackage?.isAdditionalPackage
                      ? currentPrice
                      : pack.price,
                    quantity: quantity,
                  });
                }
              }}
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
            ></p>
          </div>
          <div
            className={`flex-shrink-0 text-xl font-bold ml-4 flex items-center justify-end ${
              isInCart ? "text-gray-500" : "text-primary"
            }`}
          >
            {pack?.isAdditionalPackage && (
              <span
                className="flex items-stretch h-8 mr-4 gap-1"
                style={{ width: "120px" }}
              >
                <button
                  onClick={() => {
                    setPackage({
                      ...pack,
                      price: selectedPackage?.isAdditionalPackage
                        ? currentPrice
                        : pack.price,
                      quantity: quantity,
                    });
                    handleQuantityChange(quantity - 1);
                  }}
                  disabled={quantity <= (pack.minQuantity ?? 1)}
                  className="flex-1 flex items-center justify-center text-[#1A7EDB] border border-[#1A7EDB] rounded-md transition-colors duration-200 ease-in-out hover:bg-white active:bg-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent px-1"
                >
                  <span className="text-lg font-medium select-none">−</span>
                </button>
                <input
                  type="number"
                  min={pack.minQuantity ?? 1}
                  value={quantity}
                  onChange={(e) => {
                    const minQuantity = pack.minQuantity ?? 1;
                    const newValue = Math.max(
                      parseInt(e.target.value) || minQuantity,
                      minQuantity
                    );
                    handleQuantityChange(newValue);
                  }}
                  className="w-10 text-center bg-transparent rounded-md focus:outline-none text-sm font-medium [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none hover:bg-white"
                />
                <button
                  onClick={() => {
                    setPackage({
                      ...pack,
                      price: selectedPackage?.isAdditionalPackage
                        ? currentPrice
                        : pack.price,
                      quantity: quantity,
                    });
                    handleQuantityChange(quantity + 1);
                  }}
                  className="flex-1 flex items-center justify-center text-[#1A7EDB] border border-[#1A7EDB] rounded-md transition-colors duration-200 ease-in-out hover:bg-white active:bg-white px-1"
                >
                  <span className="text-lg font-medium select-none">+</span>
                </button>
              </span>
            )}
            <span className="text-end">
              £
              {selectedPackage?.isAdditionalPackage &&
              selectedPackage.id === pack.id 
                ? currentPrice.toFixed(2)
                : (isInCart ?  existingInCartPrice.toFixed(2) : pack.price.toFixed(2))}
            </span>
          </div>
        </label>
      </Card>
    </>
  );
}
