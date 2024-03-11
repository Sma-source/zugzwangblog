import React from "react";
import {
  TwitterLogoIcon,
  InstagramLogoIcon,
  DiscordLogoIcon,
} from "@radix-ui/react-icons";

const Footer = () => {
  return (
    <footer className=" border-t py-10">
      <div className="max-w-7xl py-10 px-5 md:p-0 space-y-5  mx-auto flex justify-between md:items-end flex-col md:flex-row">
        <div className="space-y-10">
          <div className="space-y-2 w-full sm:w-96">
            <h1 className="text-3xl font-bold">ZugZwang</h1>
            <p className="">
              Plongez dans les sujets brûlants qui façonnent le paysage
              géopolitique actuel, des relations internationales aux conflits
              régionaux, en passant par les enjeux économiques mondiaux.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <TwitterLogoIcon className="w-5 h-5" />
            <InstagramLogoIcon className="w-5 h-5" />
            <DiscordLogoIcon className="w-5 h-5" />
          </div>
        </div>

        <h1 className="text-sm">&copy; 2023 ZugZwang.All right reserved</h1>
      </div>
    </footer>
  );
};

export default Footer;
