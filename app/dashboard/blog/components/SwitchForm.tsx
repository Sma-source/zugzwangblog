"use client";
import { Switch } from "@/components/ui/switch";
import React from "react";

const SwitchForm = ({ checked }: { checked: boolean }) => {
  return (
    <form>
      <Switch checked={checked} type="submit" />
    </form>
  );
};

export default SwitchForm;
