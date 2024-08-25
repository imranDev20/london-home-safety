"use client";
import React, { FormEvent, useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function StripePaymentElement() {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const pathname = usePathname();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    try {
      setLoading(true);

      // Hardcoded payment data
      const payload = {
        service_info: {
          serviceName: "Gas Safety Check",
          serviceDetails: "Annual gas safety check for residential property.",
        },
        personal_info: {
          customer: "12345", // Hardcoded customer ID
          name: "John Doe",
          email: "john.doe@example.com",
          phone: "+44 1234 567890",
          address: {
            country: "GB",
            city: "London",
            postal_code: "W1A 1AA",
            line1: "221B Baker Street",
          },
        },
        payment_info: {
          payment_method: "credit_card",
        },
        status: "payment",
      };

      await fetch("/api/create-pre-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const response = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
        confirmParams: {
          return_url: `${window.location.origin}${window.location.pathname}?active_step=5`,
        },
      });

      setLoading(false);

      if (response.paymentIntent) {
        const status = response.paymentIntent.status;
        const { message, type } = getPaymentStatusInfo(status);

        router.replace(
          `${pathname}?active_step=4&payment_intent=${response.paymentIntent.id}&payment_intent_client_secret=${response.paymentIntent.client_secret}&redirect_status=${status}`
        );
      }
    } catch (error: any) {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-5">
      <PaymentElement
        options={{
          defaultValues: {
            billingDetails: {
              email: "john.doe@example.com", // Hardcoded email
              name: "John Doe", // Hardcoded name
              phone: "+44 1234 567890", // Hardcoded phone number
              address: {
                country: "GB",
                city: "London",
                postal_code: "W1A 1AA",
                line1: "221B Baker Street",
              },
            },
          },
        }}
      />

      <div className="mt-5 flex justify-between">
        <Button type="submit" disabled={loading || !stripe || !elements}>
          Confirm and Pay
        </Button>
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
