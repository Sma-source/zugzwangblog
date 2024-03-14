import React from "react";
import Image from "next/image";

const page = () => {
  return (
    <div className="rounded-md bg-white border-[0.5px] overflow-y-scroll ">
      <div className="w-[900px] md:w-full">
        <div className="grid grid-cols-3 border-b p-5 dark:text-gray-500">
          <h1>Name</h1>
          <h1>Subscription</h1>
          <h1>Customer</h1>
        </div>
        <div className="space-y-10 p-5">
          <div className="grid grid-cols-3 grid-flow-dense">
            <div className="flex items-center gap-2 font-medium">
              <Image
                src="/next.svg"
                className="rounded-full ring-green-500 ring-1"
                width={50}
                height={50}
                alt="profile image"
              />
              <h1>Username</h1>
            </div>

            <div className="flex items-center">
              <h1>user stripe informations</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
