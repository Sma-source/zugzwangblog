import { useUser } from "@/lib/store/user";
import { LightningBoltIcon } from "@radix-ui/react-icons";
import React, { ChangeEvent, useTransition } from "react";
import LoginForm from "../navbar/LoginForm";
import { checkout } from "@/lib/actions/stripe";
import { usePathname } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { cn } from "@/lib/utils";

const Checkout = () => {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const user = useUser((state) => state.user);

  const handleCheckout = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      const data = JSON.parse(
        await checkout(user?.user_metadata?.email!, location.origin + pathname)
      );
      const result = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!
      );
      await result?.redirectToCheckout({ sessionId: data.id });
    });
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-96 gap-2">
        <LoginForm /> to continue
      </div>
    );
  }
  return (
    <form
      onSubmit={handleCheckout}
      className={cn("flex items-center  w-full justify-center h-96", {
        " animate-pulse": isPending,
      })}
    >
      <button
        type="submit"
        className="ring-1 ring-primary p-10 rounded-md text-center"
      >
        <h1 className="uppercase  font-bold text-2xl text-primary flex items-center gap-2">
          <LightningBoltIcon
            className={cn(
              "animate-bounce w-5 h-5",
              !isPending ? "animate-bounce" : "animate-spin"
            )}
          />
          Upgrade to pro
        </h1>
        <p className="text-sm text-gray-500">Unlock all ZugZwang contents</p>
      </button>
    </form>
  );
};

export default Checkout;
