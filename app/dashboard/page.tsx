import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

const Dashboard = () => {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Blogs</h1>
        <Link href="/dashboard/blog/create">
          <Button variant="outline" className="flex items-center">
            Create <PlusIcon />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
