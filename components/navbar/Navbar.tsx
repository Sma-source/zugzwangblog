import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full justify-between items-center flex p-5 xl:p-0">
      <Link className="font-bold text-2xl" href="/">
        Zugzwang Blog
      </Link>
    </nav>
  );
};

export default Navbar;
