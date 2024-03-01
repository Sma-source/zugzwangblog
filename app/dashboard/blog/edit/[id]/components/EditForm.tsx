"use client";
import React from "react";
import BlogForm from "../../../components/BlogForm";
import { BlogFormSchemaType } from "@/app/dashboard/schema";
import { IBlogDetail } from "@/lib/types";
import { updateBlogDetail } from "@/lib/actions/blog";
import { toast } from "@/components/ui/use-toast";
import { redirect, useRouter } from "next/navigation";

const EditForm = ({ blog }: { blog: IBlogDetail }) => {
  const router = useRouter();
  const onHandleSubmit = async (data: BlogFormSchemaType) => {
    const result = JSON.parse(await updateBlogDetail(blog?.id!, data));

    if (result.error) {
      toast({
        title: "Fail to update ",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{result.error?.message}</code>
          </pre>
        ),
      });
    } else {
      toast({
        title: "Successfully update 🎉",
      });
      router.push("/dashboard");
    }
  };
  return <BlogForm onHandleSubmit={onHandleSubmit} blog={blog} />;
};

export default EditForm;
