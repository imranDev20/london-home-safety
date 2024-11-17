"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import useOrderStore from "@/hooks/use-order-store";
import { PaymentMethod } from "@prisma/client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState, useTransition } from "react";
import { createOrder } from "../../actions";
import PaymentResult from "./payment-result";
import StripePaymentElement from "./stripe-payment-element";
import { useRouter } from "next/navigation";
import { CONGESTION_FEE, PARKING_FEE } from "@/shared/data";
import OrderSummary from "../../_components/order-summary";

export default function PaymentCompo({
  redirectStatus,
}: {
  redirectStatus?: string;
}) {
  const [stripePromise, setStripePromise] =
    useState<Promise<Stripe | null> | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const [isPending, startTransition] = useTransition();
  const {
    cartItems,
    customerDetails,
    clearCart,
    resetOrder,
    paymentMethod,
    setPaymentMethod,
  } = useOrderStore();

  // Calculate prices based on customer details and cart items
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const parkingFee =
    customerDetails.parkingOptions === "FREE" ? 0 : PARKING_FEE;
  const congestionFee = customerDetails.isCongestionZone ? CONGESTION_FEE : 0;
  const totalPrice = cartTotal + parkingFee + congestionFee;

  useEffect(() => {
    if (customerDetails && cartItems.length > 0) {
      const fetchKey = async () => {
        try {
          const response = await fetch("/api/config");
          const data = await response.json();
          setStripePromise(loadStripe(data.publishableKey));
        } catch (error) {
          console.error("Error loading Stripe key:", error);
        }
      };
      fetchKey();
    }
  }, [customerDetails, cartItems]);

  useEffect(() => {
    if (customerDetails && cartItems.length > 0) {
      const fetchClientSecret = async () => {
        try {
          const orderPayload = {
            cartItems,
            customerDetails,
            totalPrice,
          };

          const response = await fetch("/api/create-payment-intent", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(orderPayload),
          });

          const data = await response.json();
          setClientSecret(data.clientSecret);
        } catch (error) {
          console.error("Error creating payment intent:", error);
        }
      };

      fetchClientSecret();
    }
  }, [cartItems, customerDetails, totalPrice]);

  const handlePaymentMethodChange = (value: PaymentMethod) => {
    setPaymentMethod(value);
  };

  const handleSubmit = async () => {
    startTransition(async () => {
      if (paymentMethod === "CREDIT_CARD") {
        throw new Error("Wrong method selected for this action");
      }

      try {
        const orderResponse = await createOrder({
          cartItems,
          customerDetails,
          paymentMethod,
        });

        if (!orderResponse) {
          throw new Error("There was an error creating the order");
        }

        toast({
          title: "Order Placed",
          description: `${orderResponse.message}`,
          variant: "success",
        });
        setIsRedirecting(true);
        router.replace("/payment/success");
      } catch (error) {
        console.error(error);
        toast({
          title: "Order Placement Failed",
          description:
            error instanceof Error
              ? error.message
              : "An unexpected error occurred",
          variant: "destructive",
        });
      } finally {
        resetOrder();
        clearCart();
      }
    });
  };

  if (isRedirecting) {
    return (
      <div className="container max-w-screen-xl mx-auto px-4 md:px-8 lg:px-16 py-8 min-h-[calc(100vh-300px)] flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Processing Your Order
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-center text-gray-600">
              Please wait while we process your order and redirect you to the
              confirmation page.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if ((!clientSecret || !stripePromise) && !redirectStatus) {
    return (
      <div className="container max-w-screen-xl mx-auto px-4 md:px-8 lg:px-16 py-8 min-h-[calc(100vh-300px)] flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Preparing Payment
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-center text-gray-600">
              We&apos;re setting up your payment securely. This may take a few
              moments.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (
    (!customerDetails.firstName || cartItems.length === 0) &&
    !redirectStatus
  ) {
    return (
      <div className="min-h-[calc(100vh_-_300px)] bg-gray-50 flex flex-col justify-center items-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-6 w-6 text-yellow-500" />
              <CardTitle className="text-2xl font-bold">
                Not Available
              </CardTitle>
            </div>
            <CardDescription>
              We&apos;re sorry, but the payment page is currently not
              accessible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              This could be due to one of the following reasons:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-gray-600">
              <li>Your shopping cart is empty</li>
              <li>Customer details are incomplete</li>
              <li>The system is temporarily undergoing maintenance</li>
            </ul>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href="/checkout">
              <Button variant="outline">Go Back</Button>
            </Link>
            <Link href="/">
              <Button>Return to Homepage</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret: clientSecret || undefined,
        appearance: { theme: "stripe", labels: "above" },
      }}
    >
      <div className="container max-w-screen-xl mx-auto px-4 md:px-8 lg:px-16 py-8">
        {!redirectStatus ? (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-2/3">
              <Card className="py-5 space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 px-5">
                    <CustomRadio
                      id="card"
                      value="CREDIT_CARD"
                      checked={paymentMethod === "CREDIT_CARD"}
                      onChange={(value) =>
                        handlePaymentMethodChange(value as PaymentMethod)
                      }
                    />
                    <label
                      htmlFor="card"
                      className="text-lg font-medium cursor-pointer"
                    >
                      Pay with Card
                    </label>
                  </div>

                  {paymentMethod === "CREDIT_CARD" && clientSecret && (
                    <div className="px-5">
                      <StripePaymentElement />
                    </div>
                  )}

                  <Separator />

                  <div className="flex items-center space-x-2 px-5">
                    <CustomRadio
                      id="bank_transfer"
                      value="BANK_TRANSFER"
                      checked={paymentMethod === "BANK_TRANSFER"}
                      onChange={(value) =>
                        handlePaymentMethodChange(value as PaymentMethod)
                      }
                    />
                    <label
                      htmlFor="bank_transfer"
                      className="text-lg font-medium cursor-pointer"
                    >
                      Bank Transfer
                    </label>
                  </div>

                  <Separator />

                  <div className="flex items-center space-x-2 px-5">
                    <CustomRadio
                      id="cash"
                      value="CASH_TO_ENGINEER"
                      checked={paymentMethod === "CASH_TO_ENGINEER"}
                      onChange={(value) =>
                        handlePaymentMethodChange(value as PaymentMethod)
                      }
                    />
                    <label
                      htmlFor="cash"
                      className="text-lg font-medium cursor-pointer"
                    >
                      Cash to Engineer
                    </label>
                  </div>
                </div>
              </Card>
            </div>

            {/* Summary Sidebar */}
            <div className="w-full lg:w-1/3 space-y-5">
              <OrderSummary
                isInCongestionZone={customerDetails.isCongestionZone}
                parkingOption={customerDetails.parkingOptions}
                showProceedButton={true}
                onProceedClick={handleSubmit}
                isPending={isPending}
              />
            </div>
          </div>
        ) : (
          <>
            <PaymentResult />
          </>
        )}
      </div>
    </Elements>
  );
}

function CustomRadio({
  id,
  value,
  checked,
  onChange,
}: {
  id: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <div
      className={`w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center cursor-pointer ${
        checked ? "border-blue-600" : ""
      }`}
      onClick={() => onChange(value)}
    >
      <input
        type="radio"
        id={id}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="hidden"
      />
      {checked && <div className="w-3 h-3 rounded-full bg-primary" />}
    </div>
  );
}
