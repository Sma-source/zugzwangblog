"use client";
import Link from "next/link";
import React from "react";
import LoginForm from "./LoginForm";
import { useUser } from "@/lib/store/user";

const Navbar = () => {
  const user = useUser((state) => state.user);
  return (
    <nav className="w-full justify-between items-center flex p-5 xl:p-0">
      <Link className="font-bold text-2xl" href="/">
        Zugzwang Blog
      </Link>
      {user ? <h1>profile</h1> : <LoginForm />}
    </nav>
  );
};

export default Navbar;
