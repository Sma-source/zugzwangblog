"use client";
import Link from "next/link";
import React from "react";
import LoginForm from "./LoginForm";
import { useUser } from "@/lib/store/user";
import Profile from "./Profile";

const Navbar = () => {
  const user = useUser((state) => state.user);
  return (
    <nav className="w-full justify-between items-center flex p-5 xl:p-0">
      <Link className="font-bold text-2xl" href="/">
        Zugzwang Blog
      </Link>
      {user ? <Profile /> : <LoginForm />}
    </nav>
  );
};

export default Navbar;
