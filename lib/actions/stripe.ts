"use server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SK_KEY!);

export const checkout = async (email: string, redirectTo: string) => {
  return JSON.stringify(
    await stripe.checkout.sessions.create({
      success_url: redirectTo || process.env.SITE_URL,
      cancel_url: process.env.SITE_URL,
      customer_email: email,
      line_items: [{ price: process.env.PRO_PRICE_ID, quantity: 1 }],
      mode: "subscription",
    })
  );
};

export const manageBilling = async (customer_id: string) => {
  return JSON.stringify(
    await stripe.billingPortal.sessions.create({
      customer: customer_id,
      return_url: process.env.SITE_URL,
    })
  );
};
