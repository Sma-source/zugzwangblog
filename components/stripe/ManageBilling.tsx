import React from "react";
import { Button } from "../ui/button";
import { BackpackIcon } from "@radix-ui/react-icons";

const ManageBilling = () => {
  return (
    <Button
      variant="ghost"
      className="w-full flex justify-between items-center"
    >
      <span className="flex items-center gap-2">Billing</span>
      <BackpackIcon />
    </Button>
  );
};

export default ManageBilling;
