"use client";

import React, { useState, useTransition } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import useOrderStore from "@/hooks/use-order-store";
import usePackageStore from "@/hooks/use-package-store";
import { SiteSettingWithRelations } from "@/types/misc";
import { Package } from "@prisma/client";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Check, ShoppingCart, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BookNowButtonCompo({
  packages,
  siteSettings,
}: {
  packages: Package[];
  siteSettings: SiteSettingWithRelations;
}) {
  const { selectedPackage, setPackage } = usePackageStore();
  const { addItem, cartItems } = useOrderStore();
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);
  const [isPending, startTransition] = useTransition();

  const isInCart = cartItems.some((item) => item.id === selectedPackage?.id);

  const handleClick = () => {
    if (!selectedPackage) {
      setShowAlert(true);
      return;
    }

    setShowAlert(false);

    if (!isInCart) {
      addItem(selectedPackage);
      setPackage(null);
      startTransition(() => {
        router.push(`/cart`);
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
        disabled={isInCart || isPending}
      >
        {isPending ? (
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        ) : isInCart ? (
          <>
            <Check className="mr-2 h-5 w-5" />
            <span>Added to Cart</span>
          </>
        ) : (
          <>
            {packages.length > 0 ? (
              <>
                <ShoppingCart className="mr-2 h-5 w-5" />
                <span className="mr-2">Book Now</span>
              </>
            ) : (
              <span className="mr-2">
                <a href={`tel:${siteSettings?.phone1 || ""}`}>
                  Call Us For Service
                </a>
              </span>
            )}
          </>
        )}
      </Button>
    </>
  );
}
