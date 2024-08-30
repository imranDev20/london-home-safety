"use client";

import React, { useEffect, useState, useTransition } from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripePaymentElement from "./_components/stripe-payment-element";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import useOrderStore from "@/hooks/use-order-store";
import { AlertCircle, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createOrder, upsertUser } from "../actions";
import { PaymentMethod } from "@prisma/client";
import { useToast } from "@/components/ui/use-toast";
import { LoadingButton } from "@/components/ui/loading-button";

export default function PaymentPage() {
  const [stripePromise, setStripePromise] = useState<Stripe | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("CREDIT_CARD");
  const router = useRouter();
  const { toast } = useToast();

  const [isPending, startTransition] = useTransition();

  const { cartItems, customerDetails, clearCart, resetOrder } = useOrderStore();

  const parkingFee = customerDetails.parkingOptions !== "FREE" ? 5 : 0;
  const congestionFee = customerDetails.isCongestionZone ? 5 : 0;
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const totalPrice = cartTotal + parkingFee + congestionFee;

  useEffect(() => {
    const fetchKey = async () => {
      try {
        const response = await fetch("/api/config");
        const data = await response.json();
        const stripe = await loadStripe(data.publishableKey);
        setStripePromise(stripe);
      } catch (error) {
        console.error("Error loading Stripe key:", error);
      }
    };

    fetchKey();
  }, []);

  useEffect(() => {
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

    if (customerDetails) {
      fetchClientSecret();
    }
  }, [cartItems, customerDetails, totalPrice]);

  const handlePaymentMethodChange = (value: PaymentMethod) => {
    setPaymentMethod(value);
  };

  const handleSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    startTransition(async () => {
      if (paymentMethod === "CREDIT_CARD") {
        throw new Error("Wrong method selected for this action");
      }

      try {
        const userResponse = await upsertUser(customerDetails);

        if (!userResponse.data?.id) {
          throw new Error("There was an error creating the customer");
        }

        const orderResponse = await createOrder({
          cartItems,
          customerDetails,
          userId: userResponse.data.id,
          paymentDetails: {
            method: paymentMethod,
            status: "UNPAID",
          },
        });

        if (!orderResponse) {
          throw new Error("There was an error creating the order");
        }

        toast({
          title: "Order Placed Successfully",
          description: `Your order has been created. ${orderResponse.message}`,
          variant: "success",
        });

        // Optionally, you can redirect the user or clear the cart here
        // router.push('/order-confirmation');
        resetOrder();
        clearCart();
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
      }
    });
  };

  if (!customerDetails.customerName || cartItems.length === 0) {
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
    <div className="container max-w-screen-xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Payment Options */}
        <div className="w-full lg:w-2/3">
          <Card className="py-5 space-y-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 px-5">
                <CustomRadio
                  id="card"
                  value="CREDIT_CARD"
                  checked={paymentMethod === "CREDIT_CARD"}
                  onChange={(value) => {
                    handlePaymentMethodChange(value as PaymentMethod);
                  }}
                />
                <label
                  htmlFor="card"
                  className="text-lg font-medium cursor-pointer"
                >
                  Pay with Card
                </label>
              </div>

              {paymentMethod === "CREDIT_CARD" &&
              stripePromise &&
              clientSecret ? (
                <div className="px-5">
                  <Elements
                    stripe={stripePromise}
                    options={{
                      clientSecret,
                      loader: "always",
                      appearance: {
                        theme: "stripe",
                        labels: "above",
                      },
                    }}
                  >
                    <StripePaymentElement />
                  </Elements>
                </div>
              ) : null}

              <Separator />

              <div className="flex items-center space-x-2 px-5">
                <CustomRadio
                  id="bank_transfer"
                  value="BANK_TRANSFER"
                  checked={paymentMethod === "BANK_TRANSFER"}
                  onChange={(value) => {
                    handlePaymentMethodChange(value as PaymentMethod);
                  }}
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
                  onChange={(value) => {
                    handlePaymentMethodChange(value as PaymentMethod);
                  }}
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
          <Card className="p-5">
            <h2 className="text-lg font-semibold mb-4">Summary</h2>
            <div className="flex justify-between items-center mb-1">
              <span className="text-gray-600">Service Price:</span>
              <span className="text-gray-900">£{cartTotal}.00</span>
            </div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-gray-600">Parking Fee:</span>
              <span className="text-gray-900">£{parkingFee}.00</span>
            </div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-gray-600">Congestion Zone Fee:</span>
              <span className="text-gray-900">£{congestionFee}.00</span>
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between items-center text-xl font-semibold">
              <span>Total Price:</span>
              <span>£{totalPrice}.00</span>
            </div>
          </Card>

          {paymentMethod !== "CREDIT_CARD" && (
            <LoadingButton
              type="submit"
              className="w-full flex items-center justify-center space-x-2"
              onClick={handleSubmit}
              loading={isPending}
            >
              {!isPending && <ShoppingCart size={20} />}
              <span>Confirm & Order</span>
            </LoadingButton>
          )}
        </div>
      </div>
    </div>
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
