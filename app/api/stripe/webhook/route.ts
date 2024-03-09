import Stripe from "stripe";
import { headers } from "next/headers";
import { buffer } from "node:stream/consumers";
import { createSupabaseAdmin } from "@/lib/supabase";

const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;
const stripe = new Stripe(process.env.STRIPE_SK_KEY!);

export async function POST(req: any) {
  const rawBody = await buffer(req.body);
  try {
    let event;
    try {
      const sig = headers().get("stripe-signature");

      event = stripe.webhooks.constructEvent(rawBody, sig!, endpointSecret!);
    } catch (err: any) {
      return Response.json({ error: "Webhook error" + err?.message });
    }

    // Handle the event
    switch (event.type) {
      case "customer.updated":
        const customer = event.data.object;
        const subscription = await stripe.subscriptions.list({
          customer: customer.id,
        });
        if (subscription.data.length) {
          const sub = subscription.data[0];
          await onSucces(
            sub.status === "active",
            sub.id,
            customer.id,
            customer.email!
          );
        }
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    return Response.json({});
  } catch (error) {
    return Response.json({ error: `Webhook Error}` });
  }
}

const onSucces = async (
  subscription_status: boolean,
  stripe_subscription_id: string,
  stripe_customer_id: string,
  email: string
) => {
  const supabaseAdmin = await createSupabaseAdmin();

  await supabaseAdmin
    .from("users")
    .update({
      subscription_status,
      stripe_subscription_id,
      stripe_customer_id,
    })
    .eq("email", email);
};
