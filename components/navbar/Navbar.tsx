"use client";
import Link from "next/link";
import React from "react";
import LoginForm from "./LoginForm";
import { useUser } from "@/lib/store/user";
import Profile from "./Profile";
import { cn } from "@/lib/utils";
import { FaChessPawn } from "react-icons/fa";

const Navbar = () => {
  const user = useUser((state) => state.user);
  return (
    <nav className="w-full justify-between items-center flex p-5 xl:p-0">
      <div className="group">
        <Link className="font-bold text-2xl gap-0 inline-flex" href="/">
          Zug
          <FaChessPawn />
          Zwang
        </Link>
        <div
          className={cn("h-1 w-0 group-hover:w-full  transition-all bg-black")}
        ></div>
      </div>
      {user ? <Profile /> : <LoginForm />}
    </nav>
  );
};

export default Navbar;
