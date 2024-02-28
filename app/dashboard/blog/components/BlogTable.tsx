import { Button } from "@/components/ui/button";
import { EyeOpenIcon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { Switch } from "@/components/ui/switch";
import React from "react";
import { readBlog } from "@/lib/actions/blog";

const BlogTable = async () => {
  const { data: blogs } = await readBlog();
  return (
    <div className="rounded-md dark:bg-graident-dark border-[0.5px] overflow-y-scroll">
      <div className="w-[800px] md:w-full">
        <div className="grid grid-cols-5 border-b p-5 dark:text-gray-500 text-zinc-500">
          <h2 className=" col-span-2">Title</h2>
          <h1>Premium</h1>
          <h1>Publish</h1>
        </div>
        {blogs?.map((blog, index) => {
          return (
            <div className="grid grid-cols-5 p-5" key={index}>
              <h1 className="col-span-2">{blog.title} </h1>
              <Switch checked={blog.is_premium} />
              <Switch checked={blog.is_published} />
              <Actions />
            </div>
          );
        })}
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
        <TrashIcon />
        Delete
      </Button>
      <Button className="flex gap-2 items-center" variant="outline">
        <Pencil1Icon />
        Edit
      </Button>
    </div>
  );
};

export default BlogTable;
