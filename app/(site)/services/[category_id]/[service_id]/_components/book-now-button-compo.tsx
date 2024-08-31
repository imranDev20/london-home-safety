"use client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import useOrderStore from "@/hooks/use-order-store";
import usePackageStore from "@/hooks/use-package-store";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { ShoppingCart } from "lucide-react";
import React, { useState } from "react";

export default function BookNowButtonCompo() {
  const { selectedPackage, propertyType } = usePackageStore();
  const { addItem } = useOrderStore();

  const [showAlert, setShowAlert] = useState(false);

  const handleClick = () => {
    if (!selectedPackage) {
      setShowAlert(true);
      return;
    }

    setShowAlert(false);

    addItem({
      name: selectedPackage.name,
      price: selectedPackage.price,
      id: selectedPackage.id,
      description: selectedPackage.description ?? "",
    });
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
        className="w-full bg-primary text-white text-base font-medium rounded-lg hover:bg-primary-darker transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center group py-6 mt-3"
        onClick={handleClick}
      >
        <ShoppingCart className="mr-2 h-5 w-5" />
        <span className="mr-2">Book Now</span>
      </Button>
    </>
  );
}
