import { NextResponse } from "next/server";
import { buffer } from "node:stream/consumers";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET_KEY;

export async function POST(req: any) {
  const rawBody = await buffer(req.body);
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      req.headers.get("stripe-signature") as string,
      process.env.STRIPE_WEBHOOK_SECRET_KEY as string
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: "Webhook signature verification failed",
      },
      {
        status: 400,
      }
    );
  }

  try {
    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;

        // Delete the pre order after order is complete

        console.log("PaymentIntent was successful!");
        break;
      case "payment_method.attached":
        const paymentMethod = event.data.object;
        console.log("PaymentMethod was attached to a Customer!");
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    const response = NextResponse.json(
      { message: "successfully received" },
      { status: 200 }
    );

    response.cookies.set("bookingSession", "", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      expires: new Date(0),
    });

    return response;
  } catch (error) {
    console.log(error);
  }
}
