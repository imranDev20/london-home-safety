"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import useOrderStore from "@/hooks/use-order-store";
import { CONGESTION_FEE, PARKING_FEE } from "@/shared/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ParkingOptions } from "@prisma/client";
import { LoadingButton } from "@/components/ui/loading-button";

interface OrderSummaryProps {
  parkingOption?: ParkingOptions;
  isInCongestionZone?: boolean;
  showProceedButton?: boolean;
  onProceedClick?: () => void;
  isPending?: boolean;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  parkingOption,
  isInCongestionZone,
  showProceedButton = true,
  onProceedClick,
  isPending,
}) => {
  const pathname = usePathname();
  const { cartItems, customerDetails, paymentMethod } = useOrderStore();
  const isCartPage = pathname === "/cart";
  const isPaymentPage = pathname === "/payment";

  const isNonCreditCardPayment =
    paymentMethod === "BANK_TRANSFER" || paymentMethod === "CASH_TO_ENGINEER";

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const parkingFee = (
    isCartPage
      ? customerDetails.parkingOptions === "FREE"
      : parkingOption === "FREE"
  )
    ? 0
    : PARKING_FEE;
  const congestionFee = (
    isCartPage ? customerDetails.isCongestionZone : isInCongestionZone
  )
    ? CONGESTION_FEE
    : 0;
  const totalPrice = subtotal + (!isCartPage ? parkingFee + congestionFee : 0);

  const renderActionButton = () => {
    if (isCartPage) {
      return (
        <div className="mt-20">
          <Link href="/book-now" className="block">
            <Button className="w-full mb-3 h-11 text-base" variant="outline">
              Continue Booking
            </Button>
          </Link>
          <Link href="/checkout">
            <Button className="w-full h-11 text-base" variant="default">
              Checkout Now
            </Button>
          </Link>
        </div>
      );
    }

    if (showProceedButton && isPaymentPage) {
      if (isNonCreditCardPayment) {
        return (
          <LoadingButton
            onClick={onProceedClick}
            loading={isPending}
            className="w-full mt-6 h-11 text-base"
          >
            Confirm & Order
          </LoadingButton>
        );
      }
      return null;
    }

    if (showProceedButton) {
      return (
        <LoadingButton
          onClick={onProceedClick}
          loading={isPending}
          className="w-full mt-6 h-11 text-base"
        >
          Proceed to Payment
        </LoadingButton>
      );
    }

    return null;
  };

  return (
    <Card className="p-6 sticky top-6">
      <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
      <div className="space-y-6">
        {/* Selected Services */}
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="space-y-1">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-900">
                    {item.package.serviceName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {item.package.name}
                    {item.package.isAdditionalPackage && (
                      <span className="ml-2 text-gray-500">
                        ({item.quantity} {item.package.unitType || "unit"})
                      </span>
                    )}
                  </p>
                </div>
                <span className="font-medium text-gray-900">
                  £{item.price.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Charges Section */}
        {!isCartPage && (
          <>
            <Separator />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">
                  £{subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Parking Fee</span>
                <span className="font-medium text-gray-900">
                  £{parkingFee.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Congestion Zone Fee</span>
                <span className="font-medium text-gray-900">
                  £{congestionFee.toFixed(2)}
                </span>
              </div>
            </div>
          </>
        )}

        {/* Total Section */}
        <Separator />
        <div className="flex justify-between items-center">
          <span className="text-base font-medium text-gray-900">
            {isCartPage ? "Subtotal" : "Total Amount"}
          </span>
          <div className="text-right">
            <span className="text-xl font-bold text-primary">
              £{(isCartPage ? subtotal : totalPrice).toFixed(2)}
            </span>
            <p className="text-xs text-gray-500 mt-0.5">Inc. VAT</p>
          </div>
        </div>

        {renderActionButton()}
      </div>
    </Card>
  );
};

export default OrderSummary;
