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
    <div>
      <CopyIcon />
    </div>
  );
};

export default CopyButton;
