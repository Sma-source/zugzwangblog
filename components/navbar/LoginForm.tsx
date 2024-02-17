"use client";
import { createBrowserClient } from "@supabase/ssr";
import React from "react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

const LoginForm = () => {
  const pathname = usePathname();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const handleLogin = () => {
    supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${location.origin}/auth/callback?next=${pathname}`,
      },
    });
  };
  return (
    <Button
      className="flex items-center gap-2"
      variant="outline"
      onClick={handleLogin}
    >
      Login
    </Button>
  );
};

export default LoginForm;
