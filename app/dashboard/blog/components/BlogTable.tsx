import { Button } from "@/components/ui/button";
import { EyeOpenIcon, Pencil1Icon } from "@radix-ui/react-icons";
import React from "react";
import { readBlogAdmin, updateBlogById } from "@/lib/actions/blog";
import DeleteAlert from "./DeleteAlert";
import SwitchForm from "./SwitchForm";
import { BlogFormSchemaType } from "../../schema";

const BlogTable = async () => {
  const { data: blogs } = await readBlogAdmin();
  return (
    <div className="rounded-md dark:bg-graident-dark border-[0.5px] overflow-y-scroll">
      <div className="w-[800px] md:w-full">
        <div className="grid grid-cols-5 border-b p-5 dark:text-gray-500 text-zinc-500">
          <h2 className=" col-span-2">Title</h2>
          <h1>Premium</h1>
          <h1>Publish</h1>
        </div>
        {blogs?.map((blog, index) => {
          const updatePremium = updateBlogById.bind(null, blog.id, {
            is_premium: !blog.is_premium,
          } as BlogFormSchemaType);
          const updatePublish = updateBlogById.bind(null, blog.id, {
            is_published: !blog.is_published,
          } as BlogFormSchemaType);
          return (
            <div className="grid grid-cols-5 p-5" key={index}>
              <h1 className="col-span-2">{blog.title} </h1>
              <SwitchForm
                checked={blog.is_premium}
                name="premium"
                onToggle={updatePremium}
              />
              <SwitchForm
                checked={blog.is_published}
                name="published"
                onToggle={updatePublish}
              />
              <Actions blogId={blog.id} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Actions = ({ blogId }: { blogId: string }) => {
  return (
    <div className="flex items-center gap-2 md:flex-wrap">
      <Button className="flex gap-2 items-center" variant="outline">
        <EyeOpenIcon />
        View
      </Button>
      <DeleteAlert blogId={blogId} />
      <Button className="flex gap-2 items-center" variant="outline">
        <Pencil1Icon />
        Edit
      </Button>
    </div>
  );
};

export default BlogTable;
