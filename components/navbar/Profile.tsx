import { useUser } from "@/lib/store/user";
import Image from "next/image";
import React from "react";

const Profile = () => {
  const user = useUser((state) => state.user);
  return (
    <Image
      src={user?.user_metadata.avatar_url}
      alt="profile img"
      width={50}
      height={50}
      className="rounded-full ring-2 ring-violet-500"
    />
  );
};

export default Profile;
