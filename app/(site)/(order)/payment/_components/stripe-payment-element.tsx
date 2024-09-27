"use client";

import React, { FormEvent, useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useRouter, usePathname } from "next/navigation";
import useOrderStore from "@/hooks/use-order-store";
import { createOrder } from "../../actions";
import { LoadingButton } from "@/components/ui/loading-button";
import { CreditCard } from "lucide-react";

export default function StripePaymentElement() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const pathname = usePathname();

  const { customerDetails, cartItems, resetOrder, clearCart } = useOrderStore();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorMessage(null);

    if (!stripe || !elements) {
      setErrorMessage("Stripe has not been properly initialized.");
      return;
    }

    try {
      setLoading(true);

      const orderResponse = await createOrder({
        cartItems,
        customerDetails,
        paymentMethod: "CREDIT_CARD",
      });

      if (!orderResponse.success) {
        throw new Error(
          orderResponse?.message || "There was an error creating the order"
        );
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

        router.replace(
          `${pathname}?payment_intent=${response.paymentIntent.id}&payment_intent_client_secret=${response.paymentIntent.client_secret}&redirect_status=${status}`
        );

        resetOrder();
        clearCart();
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
              name: customerDetails.firstName + " " + customerDetails.lastName,
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
        <LoadingButton type="submit" loading={loading || !stripe || !elements}>
          {!loading && <CreditCard className="w-5 h-5 mr-2" />}
          {loading ? "Processing..." : "Complete Payment"}
        </LoadingButton>
      </div>
    </form>
  );
}

type Variant = "success" | "info" | "warning" | "danger";

function getPaymentStatusInfo(status: string): {
  message: string;
  type: Variant;
} {
  switch (status) {
    case "requires_payment_method":
      return { message: "Your payment method was not provided.", type: "info" };
    case "requires_confirmation":
      return { message: "Your payment requires confirmation.", type: "info" };
    case "requires_action":
      return {
        message: "Additional action is required to complete your payment.",
        type: "info",
      };
    case "processing":
      return { message: "Your payment is being processed.", type: "info" };
    case "requires_capture":
      return { message: "Your payment needs to be captured.", type: "info" };
    case "canceled":
      return { message: "Your payment was cancelled.", type: "danger" };
    case "succeeded":
      return { message: "Your payment was successful.", type: "success" };
    default:
      return { message: "An unknown error occurred.", type: "danger" };
  }
}
