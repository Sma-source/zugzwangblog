import { useUser } from "@/lib/store/user";
import Image from "next/image";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
      <PopoverContent>Place content for the popover here.</PopoverContent>
    </Popover>
  );
};

export default Profile;
