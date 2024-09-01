"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import useOrderStore from "@/hooks/use-order-store";
import usePackageStore from "@/hooks/use-package-store";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { ShoppingCart, Check } from "lucide-react";
import React, { useState, useMemo } from "react";

export default function BookNowButtonCompo() {
  const { selectedPackage } = usePackageStore();
  const { addItem, cartItems } = useOrderStore();

  const [showAlert, setShowAlert] = useState(false);

  const isInCart = useMemo(() => {
    return cartItems.some((item) => item.id === selectedPackage?.id);
  }, [cartItems, selectedPackage]);

  const handleClick = () => {
    if (!selectedPackage) {
      setShowAlert(true);
      return;
    }

    setShowAlert(false);

    if (!isInCart) {
      addItem({
        name: selectedPackage.name,
        price: selectedPackage.price,
        id: selectedPackage.id,
        description: selectedPackage.description ?? "",
      });
    }
  };

  return (
    <>
      {showAlert && (
        <Alert variant="destructive">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertDescription>Please select a package</AlertDescription>
        </Alert>
      )}
      <Button
        size="lg"
        className={`w-full text-white text-base font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center group py-6 mt-3 ${
          isInCart
            ? "bg-green-500 hover:bg-green-600"
            : "bg-primary hover:bg-primary-darker"
        }`}
        onClick={handleClick}
        disabled={isInCart}
      >
        {isInCart ? (
          <>
            <Check className="mr-2 h-5 w-5" />
            <span>Added to Cart</span>
          </>
        ) : (
          <>
            <ShoppingCart className="mr-2 h-5 w-5" />
            <span className="mr-2">Book Now</span>
          </>
        )}
      </Button>
    </>
  );
}
