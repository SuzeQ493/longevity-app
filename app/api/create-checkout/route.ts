import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Longevity Assessment Report",
            description:
              "Your personalised AI-powered longevity score, 5-area protocol, week-one plan, and biomarker recommendations.",
          },
          unit_amount: 1900, // $19.00
        },
        quantity: 1,
      },
    ],
    success_url: `${baseUrl}/results`,
    cancel_url: `${baseUrl}/pay`,
  });

  return NextResponse.json({ url: session.url });
}
