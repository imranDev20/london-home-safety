import React from "react";
import { useFormContext } from "react-hook-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { CreateOrderFormInput } from "../schema";
import { CONGESTION_FEE, PARKING_FEE } from "@/shared/data";
import { CreditCard, Wallet } from "lucide-react";
import { Package } from "@prisma/client";

interface PaymentInfoProps {
  packages: Package[];
}

export default function PaymentInfo({ packages }: PaymentInfoProps) {
  const { control, watch } = useFormContext<CreateOrderFormInput>();
  const selectedPackages = watch("cartItems");
  const isCongestionZone = watch("isCongestionZone");
  const parkingOptions = watch("parkingOptions");

  const priceSummary = () => {
    const subtotal = selectedPackages.reduce((total, pkg) => {
      return total + (pkg.price || 0);
    }, 0);

    const congestionCharge = isCongestionZone ? CONGESTION_FEE : 0;
    const parkingCharge = parkingOptions !== "FREE" ? PARKING_FEE : 0;
    const total = subtotal + congestionCharge + parkingCharge;

    return { subtotal, congestionCharge, parkingCharge, total };
  };

  const summary = priceSummary();

  const renderPackageInfo = (selectedPkg: any, packageDetails: Package) => {
    const quantityDisplay = packageDetails.isAdditionalPackage
      ? `${selectedPkg.quantity} ${packageDetails.unitType || "units"}`
      : packageDetails.unitType;

    return (
      <div key={selectedPkg.packageId} className="space-y-1">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-900">
              {packageDetails.serviceName}
            </p>
            <p className="text-sm text-gray-600">
              {packageDetails.name}
              {quantityDisplay && (
                <span className="ml-2 text-gray-500">({quantityDisplay})</span>
              )}
            </p>
          </div>
          <span className="font-medium text-gray-900">
            £{selectedPkg.price.toFixed(2)}
          </span>
        </div>
      </div>
    );
  };

  return (
    <Card className="bg-white">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Payment Information</CardTitle>
        <CardDescription>
          Review your order summary and select your preferred payment method
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Payment Method Selection */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Payment Method</h3>
              <FormField
                control={control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-1 gap-3">
                      <div
                        className={`relative flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:border-primary transition-colors ${
                          field.value === "CASH_TO_ENGINEER"
                            ? "border-primary bg-primary/5"
                            : "border-gray-200"
                        }`}
                        onClick={() => field.onChange("CASH_TO_ENGINEER")}
                      >
                        <Wallet className="h-5 w-5 text-primary" />
                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-gray-900">
                            Cash to Engineer
                          </h3>
                          <p className="text-sm text-gray-500">
                            Pay in cash when service is complete
                          </p>
                        </div>
                      </div>

                      <div
                        className={`relative flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:border-primary transition-colors ${
                          field.value === "BANK_TRANSFER"
                            ? "border-primary bg-primary/5"
                            : "border-gray-200"
                        }`}
                        onClick={() => field.onChange("BANK_TRANSFER")}
                      >
                        <CreditCard className="h-5 w-5 text-primary" />
                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-gray-900">
                            Bank Transfer
                          </h3>
                          <p className="text-sm text-gray-500">
                            Pay via bank transfer
                          </p>
                        </div>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Order Summary</h3>
              <div className="bg-gray-50 rounded-lg p-6 space-y-6">
                {/* Services */}
                <div className="space-y-4">
                  {selectedPackages.map((selectedPkg) => {
                    const packageDetails = packages.find(
                      (pkg) => pkg.id === selectedPkg.packageId
                    );
                    return packageDetails
                      ? renderPackageInfo(selectedPkg, packageDetails)
                      : null;
                  })}
                </div>

                <Separator />

                {/* Additional Charges */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium text-gray-900">
                      £{summary.subtotal.toFixed(2)}
                    </span>
                  </div>

                  {summary.congestionCharge > 0 && (
                    <div className="flex justify-between text-gray-600">
                      <span>Congestion Zone Fee</span>
                      <span className="font-medium text-gray-900">
                        £{summary.congestionCharge.toFixed(2)}
                      </span>
                    </div>
                  )}

                  {summary.parkingCharge > 0 && (
                    <div className="flex justify-between text-gray-600">
                      <span>Parking Fee</span>
                      <span className="font-medium text-gray-900">
                        £{summary.parkingCharge.toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Total */}
                <div className="flex justify-between items-center">
                  <span className="text-base font-medium text-gray-900">
                    Total Amount
                  </span>
                  <div className="text-right">
                    <span className="text-xl font-bold text-primary">
                      £{summary.total.toFixed(2)}
                    </span>
                    <p className="text-xs text-gray-500 mt-0.5">Inc. VAT</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
