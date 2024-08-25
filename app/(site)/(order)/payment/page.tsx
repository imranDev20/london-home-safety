"use client";

import React, { useEffect, useState, FormEvent } from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripePaymentElement from "./_components/stripe-payment-element";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function PaymentPage() {
  const [stripePromise, setStripePromise] = useState<Stripe | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>("card");

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
          // Add your order details here, e.g. items, total amount, etc.
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
  }, []);

  // Assuming the service price, parking fee, and congestion fee are the same as in the CheckoutPage
  const parkingFee = 5; // Adjust according to your logic
  const congestionFee = 5; // Adjust according to your logic
  const totalPrice = 460 + parkingFee + congestionFee;

  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (paymentMethod === "card") {
      // Handle Stripe payment submission
    } else {
      // Handle non-card payment methods
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="container max-w-screen-xl mx-auto pt-5 pb-20"
    >
      <div className="grid grid-cols-12 gap-5">
        {/* Payment Options */}
        <div className="col-span-8">
          <Card className="p-5 space-y-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <CustomRadio
                  id="card"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={handlePaymentMethodChange}
                />
                <label
                  htmlFor="card"
                  className="text-lg font-medium cursor-pointer"
                >
                  Pay with Card
                </label>
              </div>

              {paymentMethod === "card" && stripePromise && clientSecret ? (
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
              ) : null}
              <Separator />
              <div className="flex items-center space-x-2">
                <CustomRadio
                  id="bank_transfer"
                  value="bank_transfer"
                  checked={paymentMethod === "bank_transfer"}
                  onChange={handlePaymentMethodChange}
                />
                <label
                  htmlFor="bank_transfer"
                  className="text-lg font-medium cursor-pointer"
                >
                  Bank Transfer
                </label>
              </div>
              <Separator />
              <div className="flex items-center space-x-2">
                <CustomRadio
                  id="cash"
                  value="cash"
                  checked={paymentMethod === "cash"}
                  onChange={handlePaymentMethodChange}
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
        <div className="col-span-4 space-y-5">
          <Card className="p-5">
            <h2 className="text-lg font-semibold mb-4">Summary</h2>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Service Price:</span>
              <span className="text-gray-900">£460.00</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Parking Fee:</span>
              <span className="text-gray-900">£{parkingFee}.00</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Congestion Zone Fee:</span>
              <span className="text-gray-900">£{congestionFee}.00</span>
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between items-center text-xl font-semibold">
              <span>Total Price:</span>
              <span>£{totalPrice}.00</span>
            </div>
          </Card>

          {paymentMethod !== "card" && (
            <Button type="submit" className="w-full">
              Confirm and Order
            </Button>
          )}
        </div>
      </div>
    </form>
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
