import BannerNewsletter from "@/components/banner/BannerNewsletter";
import React, { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <BannerNewsletter />
    </>
  );
}
