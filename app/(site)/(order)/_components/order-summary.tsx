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
  const { cartItems, customerDetails } = useOrderStore();
  const isCartPage = pathname === "/cart";
  const isPaymentPage = pathname === "/payment";

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

  return (
    <Card className="p-6 sticky top-6">
      <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
      <div className="space-y-4">
        {/* Selected Services */}
        <div className="space-y-3">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between text-sm items-center"
            >
              <div className="flex items-center gap-2">
                <span className="text-gray-600">{item.package.name}</span>
                {item.package.isAdditionalPackage && (
                  <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
                    x{item.quantity}
                  </span>
                )}
              </div>
              <span className="font-medium">£{item.price.toFixed(2)}</span>
            </div>
          ))}
        </div>

        {/* Subtotal */}
        {!isCartPage && (
          <>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Subtotal:</span>
              <span className="text-gray-900">£{subtotal.toFixed(2)}</span>
            </div>

            {/* Additional Fees */}
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Parking Fee:</span>
              <span className="text-gray-900">£{parkingFee.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Congestion Zone Fee:</span>
              <span className="text-gray-900">£{congestionFee.toFixed(2)}</span>
            </div>
          </>
        )}

        {/* Final Total/Subtotal */}
        <Separator />
        <div className="flex justify-between items-center text-xl font-semibold">
          <span>{isCartPage ? "Subtotal" : "Total"}:</span>
          <span>
            £{(isCartPage ? subtotal : totalPrice).toFixed(2)}{" "}
            <span className="text-body font-normal text-sm">(inc. Tax)</span>
          </span>
        </div>
      </div>

      {/* Buttons */}
      {isCartPage ? (
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
      ) : (
        showProceedButton && (
          <LoadingButton
            onClick={onProceedClick}
            loading={isPending}
            className="w-full mt-6 h-11 text-base"
          >
            {isPaymentPage ? "Cofirm & Order" : "Proceed to Payment"}
          </LoadingButton>
        )
      )}
    </Card>
  );
};

export default OrderSummary;
