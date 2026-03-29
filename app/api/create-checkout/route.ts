import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const body = await req.json().catch(() => ({}));
  const peptideName: string | undefined = body.peptideName;
  const priceEur: number | undefined = body.price;

  // Peptide product purchase
  if (peptideName && priceEur) {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: peptideName,
              description: "Personalised peptide protocol product",
            },
            unit_amount: Math.round(priceEur * 100),
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/peptide/results?purchased=true`,
      cancel_url: `${baseUrl}/peptide/results`,
    });
    return NextResponse.json({ url: session.url });
  }

  // Fallback — generic checkout (unused now but kept for safety)
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { name: "Longevity Assessment Report" },
          unit_amount: 1900,
        },
        quantity: 1,
      },
    ],
    success_url: `${baseUrl}/results`,
    cancel_url: `${baseUrl}/pay`,
  });

  return NextResponse.json({ url: session.url });
}
