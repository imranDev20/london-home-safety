"use client";

import React, { FormEvent, useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import useOrderStore from "@/hooks/use-order-store";
import { createOrder, upsertUser } from "../../actions";

export default function StripePaymentElement() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const pathname = usePathname();

  const { customerDetails, cartItems } = useOrderStore();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorMessage(null);

    if (!stripe || !elements) {
      setErrorMessage("Stripe has not been properly initialized.");
      return;
    }

    try {
      setLoading(true);

      const userResponse = await upsertUser(customerDetails);

      if (!userResponse.data?.id) {
        throw new Error("There wass error creating the customer");
      }

      const orderResponse = await createOrder({
        cartItems,
        customerDetails,
        userId: userResponse.data?.id,
        paymentDetails: {
          method: "CREDIT_CARD",
          status: "PAID",
        },
      });

      if (!orderResponse) {
        throw new Error("There was error creating the order");
      }

      const response = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-confirmation`,
        },
        redirect: "if_required",
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      if (response.paymentIntent) {
        const status = response.paymentIntent.status;
        // const { message, type } = getPaymentStatusInfo(status);

        router.push(
          `${pathname}?active_step=4&payment_intent=${response.paymentIntent.id}&payment_intent_client_secret=${response.paymentIntent.client_secret}&redirect_status=${status}`
        );
      }
    } catch (error: any) {
      console.error("Payment error:", error);
      setErrorMessage(
        error.message || "An error occurred during payment processing."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="mt-5" onSubmit={handleSubmit}>
      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

      <PaymentElement
        options={{
          defaultValues: {
            billingDetails: {
              email: customerDetails.email,
              name: customerDetails.customerName,
              phone: customerDetails.phoneNumber,
              address: {
                country: "GB",
                city: customerDetails.address.city,
                postal_code: customerDetails.address.postcode,
                line1: customerDetails.address.street,
              },
            },
          },
        }}
      />

      <div className="mt-5 flex justify-between">
        <Button type="submit" disabled={loading || !stripe || !elements}>
          {loading ? "Processing..." : "Complete Payment"}
        </Button>
      </div>
    </form>
  );
}

// ... rest of the code remains the same
