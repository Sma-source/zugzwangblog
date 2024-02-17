import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const Navbar = () => {
  return (
    <nav className="w-full justify-between items-center flex p-5 xl:p-0">
      <Link className="font-bold text-2xl" href="/">
        Zugzwang Blog
      </Link>
      <Button className="flex items-center gap-2" variant="outline">
        Login
      </Button>
    </nav>
  );
};

export default Navbar;
