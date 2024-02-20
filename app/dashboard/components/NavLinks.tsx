import { PersonIcon, ReaderIcon } from "@radix-ui/react-icons";
import React from "react";

const NavLinks = () => {
  const links = [
    {
      href: "/dashboard",
      Icon: ReaderIcon,
      text: "dashboard",
    },
    {
      href: "/dashboard/user",
      Icon: PersonIcon,
      text: "users",
    },
  ];
  return <div className="flex items-center gap-5 border-b pb-2">NavLinks</div>;
};

export default NavLinks;
