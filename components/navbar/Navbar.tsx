import Link from "next/link";
import React from "react";
import LoginForm from "./LoginForm";

const Navbar = () => {
  return (
    <nav className="w-full justify-between items-center flex p-5 xl:p-0">
      <Link className="font-bold text-2xl" href="/">
        Zugzwang Blog
      </Link>
      <LoginForm />
    </nav>
  );
};

export default Navbar;
