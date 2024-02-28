"use client";
import React from "react";
import BlogForm from "../components/BlogForm";
import { BlogFormSchemaType } from "../../schema";
import { toast } from "@/components/ui/use-toast";
import { createBlog } from "@/lib/actions/blog";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const CreateForm = () => {
  const router = useRouter();
  const handleCreate = async (data: BlogFormSchemaType) => {
    const result = JSON.parse(await createBlog(data));

    const { error } = result as PostgrestSingleResponse<null>;
    if (error?.message) {
      toast({
        title: "Fail to create a post 😢",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{error.message}</code>
          </pre>
        ),
      });
    } else {
      toast({
        title: "Successfully create a post 🎉",
        description: data.title,
      });
      router.push("/dashboard");
    }
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };
  return <BlogForm onHandleSubmit={handleCreate} />;
};

export default CreateForm;
