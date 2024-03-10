"use client";
import React, { ChangeEvent, useTransition } from "react";
import { Button } from "../ui/button";
import { BackpackIcon } from "@radix-ui/react-icons";
import { useUser } from "@/lib/store/user";
import { manageBilling } from "@/lib/actions/stripe";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";

const ManageBilling = () => {
  const user = useUser((state) => state.user);
  const [isPending, startTransition] = useTransition();
  const submit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      const data = JSON.parse(await manageBilling(user?.stripe_customer_id!));
      window.location.href = data.url;
    });
  };
  return (
    <form onSubmit={submit}>
      <Button
        variant="ghost"
        className="w-full flex justify-between items-center"
      >
        <span className="flex items-center gap-2">
          <AiOutlineLoading3Quarters
            className={cn(" animate-spin", { hidden: !isPending })}
          />
          Billing
        </span>
        <BackpackIcon />
      </Button>
    </form>
  );
};

export default ManageBilling;
