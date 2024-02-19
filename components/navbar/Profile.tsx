import { useUser } from "@/lib/store/user";
import Image from "next/image";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { Button } from "../ui/button";

const Profile = () => {
  const user = useUser((state) => state.user);
  return (
    <Popover>
      <PopoverTrigger>
        <Image
          src={user?.user_metadata.avatar_url}
          alt="profile img"
          width={50}
          height={50}
          className="rounded-full ring-2 ring-violet-500"
        />
      </PopoverTrigger>
      <PopoverContent className="space-y-3 divide-y p-2" side="bottom">
        <div className="px-4">
          <p className="text-sm">{user?.user_metadata.user_name}</p>
          <p className="text-sm text-gray-600">{user?.user_metadata.email}</p>
        </div>
        <Link href="/dashboard">
          <Button
            variant="ghost"
            className="w-full flex justify-between items-center"
          >
            Dashboard
          </Button>
        </Link>

        <Button
          variant="ghost"
          className="w-full flex justify-between items-center"
        >
          Log out
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default Profile;
