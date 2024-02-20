import React, { ReactNode } from "react";
import NavLinks from "./components/NavLinks";

function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <NavLinks />
      {children}
    </>
  );
}

export default Layout;
