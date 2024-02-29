"use client";
import { Switch } from "@/components/ui/switch";
import React from "react";

const SwitchForm = ({
  checked,
  onToggle,
}: {
  checked: boolean;
  onToggle: () => Promise<string>;
}) => {
  return (
    <form>
      <Switch checked={checked} type="submit" />
    </form>
  );
};

export default SwitchForm;
