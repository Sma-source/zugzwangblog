import BannerNewsletter from "@/components/banner/BannerNewsletter";
import Hero from "@/components/Hero";
import React, { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Hero />
      {children}
      <BannerNewsletter />
    </>
  );
}
