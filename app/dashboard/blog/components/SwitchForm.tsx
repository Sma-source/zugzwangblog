"use client";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import React, { ChangeEvent } from "react";

const SwitchForm = ({
  checked,
  onToggle,
  name,
}: {
  checked: boolean;
  onToggle: () => Promise<string>;
  name: string;
}) => {
  const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = JSON.parse(await onToggle());
    if (!error) {
      toast({
        title: `Successfully update ${name} 🎉`,
      });
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <Switch checked={checked} type="submit" className="bg-violet-500" />
    </form>
  );
};

export default SwitchForm;
