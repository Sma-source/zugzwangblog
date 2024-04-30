import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";
import BlogTable from "./blog/components/BlogTable";

const Dashboard = () => {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Blogs</h1>
        <Link href="/dashboard/blog/create">
          <Button className="flex items-center bg-purple-500 hover:bg-purple-400">
            Create <PlusIcon />
          </Button>
        </Link>
      </div>
      <BlogTable />
    </div>
  );
};

export default Dashboard;
