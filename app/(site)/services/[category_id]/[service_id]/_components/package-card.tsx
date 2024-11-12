"use client";

import React, { useMemo, useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import usePackageStore from "@/hooks/use-package-store";
import useOrderStore from "@/hooks/use-order-store";
import { Package } from "@prisma/client";
import { Check, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

export default function PackageCard({ pack }: { pack: Package }) {
  console.log("pack", pack);

  const { selectedPackage, setPackage } = usePackageStore();
  const { cartItems, addItem, updateItemQuantity } = useOrderStore();
  const [quantity, setQuantity] = useState(pack.minQuantity ?? 1);
  const [currentPrice, setCurrentPrice] = useState(pack.price);

  const cartItem = useMemo(() => {
    return cartItems.find((item) => item.id === pack.id);
  }, [cartItems, pack.id]);

  const calculatePrice = useCallback(
    (newQuantity: number) => {
      if (!selectedPackage) return;

      const basePrice = pack.price;
      const extraUnits = Math.max(0, newQuantity - (pack.minQuantity ?? 1));
      const extraPrice = extraUnits * (pack.extraUnitPrice ?? 0);
      const finalPrice = basePrice + extraPrice;
      setCurrentPrice(finalPrice);
    },
    [pack, selectedPackage]
  );

  useEffect(() => {
    if (selectedPackage?.id === pack.id && selectedPackage.minQuantity) {
      setQuantity(selectedPackage.minQuantity);
      calculatePrice(selectedPackage.minQuantity);
    }
  }, [selectedPackage, pack.id, calculatePrice]);

  const handleQuantityChange = (newValue: number) => {
    const minQuantity = pack.minQuantity ?? 1;
    if (newValue >= minQuantity) {
      setQuantity(newValue);
      calculatePrice(newValue);
    }
  };

  const handleAddToCart = () => {
    if (cartItem) {
      updateItemQuantity(pack.id, quantity);
      toast({
        title: "Success",
        description: "Cart updated successfully!",
        style: { color: "green" },
      });
    } else {
      addItem(pack, quantity);
      toast({
        title: "Success",
        description: "Added to cart!",
        style: { color: "green" },
      });
    }
  };

  useEffect(() => {
    if (cartItem) {
      setQuantity(cartItem.quantity);
      calculatePrice(cartItem.quantity);
    }
  }, [cartItem, calculatePrice]);

  return (
    <Card
      key={pack.id}
      className={`py-2.5 overflow-hidden border-2 transition-all hover:bg-[#E8F2FB] duration-200 relative ${
        cartItem ? "border-primary bg-[#E8F2FB]" : "hover:border-primary"
      }`}
    >
      {cartItem && (
        <div className="absolute top-0 right-0 bg-secondary text-black text-xs font-semibold px-2 py-1 rounded-bl-md flex items-center">
          <ShoppingCart className="w-3 h-3 mr-1" />
          In Cart
        </div>
      )}
      <label
        htmlFor={pack.id}
        className="flex items-start cursor-pointer p-5 transition-all duration-200 ease-in-out"
      >
        <div className="flex-shrink-0 mt-1">
          <input
            type="radio"
            name="packageOption"
            value={pack.id}
            checked={selectedPackage?.id === pack.id}
            id={pack.id}
            className="sr-only peer"
            onChange={() => setPackage(pack)}
          />
          <div className="w-6 h-6 border-2 border-primary rounded-full flex items-center justify-center peer-checked:bg-primary transition-all duration-200">
            <Check className="w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200" />
          </div>
        </div>
        <div className="flex-grow ml-4">
          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold text-gray-900">{pack.name}</p>
            <span className="text-xl font-bold text-primary">
              £{currentPrice.toFixed(2)}
            </span>
          </div>
          <p className="text-sm mt-1 text-gray-600">{pack.description}</p>

          {/* selected package dropdown */}
          {selectedPackage?.id === pack.id && (
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <div
                  className="flex items-stretch h-8 gap-1"
                  style={{ width: "120px" }}
                >
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
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
                      const newValue =
                        parseInt(e.target.value) || pack.minQuantity || 1;
                      handleQuantityChange(newValue);
                    }}
                    className="w-10 text-center bg-transparent rounded-md focus:outline-none text-sm font-medium [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none hover:bg-white"
                  />
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="flex-1 flex items-center justify-center text-[#1A7EDB] border border-[#1A7EDB] rounded-md transition-colors duration-200 ease-in-out hover:bg-white active:bg-white px-1"
                  >
                    <span className="text-lg font-medium select-none">+</span>
                  </button>
                </div>
              </div>
              <Button
                onClick={handleAddToCart}
                className="w-full bg-primary hover:bg-primary/90"
              >
                {cartItem ? "Update Cart" : "Book Now"}
              </Button>
            </div>
          )}
        </div>
      </label>
    </Card>
  );
}
