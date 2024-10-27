import { CustomerDetails } from "@/hooks/use-order-store";
import { CONGESTION_FEE, PARKING_FEE } from "@/shared/data";
import { Package } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// This is your test secret API key.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

export async function POST(req: NextRequest) {
  try {
    const {
      customerDetails,
      cartItems,
    }: { customerDetails: CustomerDetails; cartItems: Package[] } =
      await req.json();

    const parkingFee =
      customerDetails.parkingOptions !== "FREE" ? PARKING_FEE : 0;
    const congestionFee = customerDetails.isCongestionZone ? CONGESTION_FEE : 0;
    const cartTotal = cartItems.reduce((sum, item) => sum + item.price, 0);
    const totalPrice = cartTotal + parkingFee + congestionFee;

    // Convert totalPrice from pounds to pence
    const amountInPence = Math.round(totalPrice * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      currency: "gbp",
      amount: amountInPence,
      payment_method_types: ["card"],
      description: "Thanks for your purchase!",
    });

    if (paymentIntent.client_secret) {
      return NextResponse.json(
        {
          clientSecret: paymentIntent.client_secret,
          orderId: paymentIntent.id,
        },
        {
          status: 200,
        }
      );
    } else {
      return NextResponse.json(
        {
          message: "Payment intent not found",
        },
        {
          status: 404,
        }
      );
    }
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        message: error.message || "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
