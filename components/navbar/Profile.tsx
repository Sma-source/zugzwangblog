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
import { createBrowserClient } from "@supabase/ssr";
import { LockOpen1Icon } from "@radix-ui/react-icons";
import ManageBilling from "../stripe/ManageBilling";

const Profile = () => {
  const user = useUser((state) => state.user);
  const setUser = useUser((state) => state.setUser);
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const isAdmin = user?.role === "admin";
  const isSub = user?.subscription_status;
  return (
    <Popover>
      <PopoverTrigger>
        <Image
          src={user?.image_url || ""}
          alt="profile img"
          width={50}
          height={50}
          className="rounded-full ring-2 ring-violet-500"
        />
      </PopoverTrigger>
      <PopoverContent className="space-y-3 divide-y p-2" side="bottom">
        <div className="px-4">
          <p className="text-sm">{user?.display_name}</p>
          <p className="text-sm text-gray-600">{user?.email}</p>
        </div>
        {isAdmin && (
          <Link href="/dashboard">
            <Button
              variant="ghost"
              className="w-full flex justify-between items-center"
            >
              Dashboard
            </Button>
          </Link>
        )}

        {isSub && <ManageBilling />}

        <Button
          variant="ghost"
          className="w-full flex justify-between items-center"
          onClick={handleLogout}
        >
          Log out <LockOpen1Icon />
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default Profile;
