import { CopyIcon } from "lucide-react";
import React, { useState } from "react";

const CopyButton = ({ id }: { id: string }) => {
  const [OnCopy, setOnCopy] = useState(false);
  const handleCopy = async () => {
    let text = document.getElementById(id)!.textContent;
    try {
      await navigator.clipboard.writeText(text!);
      setOnCopy(true);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };
  return (
    <div className="hover:scale-105 relative hover:bg-zinc-700 p-2 rounded-md cursor-pointer">
      <CopyIcon />
    </div>
  );
};

export default CopyButton;
