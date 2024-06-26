"use client";
import { cn } from "@/lib/utils";
import { PersonIcon, ReaderIcon, BarChartIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLinks = () => {
  const pathname = usePathname();
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
    {
      href: "/dashboard/analytics",
      Icon: BarChartIcon,
      text: "analytics",
    },
  ];
  return (
    <div className="flex items-center gap-5 border-b pb-2">
      {links.map(({ href, Icon, text }, index) => {
        return (
          <Link
            href={href}
            key={index}
            className={cn(
              "text-sm text-gray-400 flex  items-center gap-1 hover:underline transition-all",
              { "text-violet-500 underline": pathname === href }
            )}
          >
            <Icon /> / {text}
          </Link>
        );
      })}
    </div>
  );
};

export default NavLinks;
