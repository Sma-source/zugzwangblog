import React from "react";
import { cn } from "@/lib/utils";
import RetroGrid from "./ui/retro-grid";
import DotPattern from "./ui/dot-patter";
import TypingAnimation from "./ui/typing-animation";

const Hero = () => {
  return (
    <div className="relative flex h-[70vh] w-full max-w-full items-center justify-center overflow-hidden  bg-transparent p-20">
      <TypingAnimation text="Géopolitique + Tech" />
      <DotPattern
        className={cn(
          "md:[mask-image:radial-gradient(265px_circle_at_center,white,transparent)] [mask-image:radial-gradient(210px_circle_at_center,white,transparent)]"
        )}
      />
    </div>
  );
};

export default Hero;
