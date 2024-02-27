"use client";
import { CheckIcon, CopyIcon } from "lucide-react";
import React, { useState } from "react";

const CopyButton = ({ id }: { id: string }) => {
  const [onCopy, setOnCopy] = useState(false);
  const [onSuccess, setSuccess] = useState(false);
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
    <div
      onClick={handleCopy}
      className="hover:scale-105 relative hover:bg-zinc-900 p-2 rounded-md cursor-pointer"
    >
      <CheckIcon
        className={`" cursor-pointer  transition-all w-5 h-5  text-green-500 ${
          onSuccess ? "scale-100 " : "scale-0 "
        }`}
        onTransitionEnd={() => {
          setTimeout(() => {
            setSuccess(false);
            setOnCopy(false);
          }, 1000);
        }}
      />
      {onCopy && <p className="text-xs">Copy to clipboard</p>}
      <div className="h-full w-full absolute top-0 left-0 flex items-center justify-center">
        <CopyIcon
          className={`" transition-all ${onCopy ? "scale-0" : "scale-100 "}`}
          onTransitionEnd={() => {
            if (onCopy) {
              setSuccess(true);
            }
          }}
        />
      </div>
    </div>
  );
};

export default CopyButton;
