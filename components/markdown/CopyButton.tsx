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
    <div className="hover:scale-105 relative hover:bg-zinc-900 p-2 rounded-md cursor-pointer">
      <div className="h-full w-full absolute top-0 left-0 flex items-center justify-center">
        <CopyIcon />
      </div>
    </div>
  );
};

export default CopyButton;
