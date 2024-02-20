import { Button } from "@/components/ui/button";
import { EyeOpenIcon, Pencil1Icon } from "@radix-ui/react-icons";
import { Switch } from "@/components/ui/switch";
import React from "react";

const BlogTable = () => {
  return (
    <div className="rounded-md dark:bg-graident-dark border-[0.5px] overflow-y-scroll">
      <div className="w-[800px] md:w-full">
        <div className="grid grid-cols-5 border-b p-5 dark:text-gray-500 text-zinc-500">
          <h1 className=" col-span-2">Title</h1>
          <h1>Premium</h1>
          <h1>Publish</h1>
        </div>
        <div className="grid grid-cols-5 p-5">
          <h1 className="col-span-2">BlogTitle</h1>
          <Switch checked={false} />
          <Switch checked={true} />
          <Actions />
        </div>
      </div>
    </div>
  );
};

const Actions = () => {
  return (
    <div className="flex items-center gap-2 md:flex-wrap">
      <Button className="flex gap-2 items-center" variant="outline">
        <EyeOpenIcon />
        View
      </Button>
      <Button className="flex gap-2 items-center" variant="outline">
        <Pencil1Icon />
        Edit
      </Button>
    </div>
  );
};

export default BlogTable;
