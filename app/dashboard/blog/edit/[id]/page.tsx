import React from "react";
import EditForm from "./components/EditForm";
import { readBlogDetailById } from "@/lib/actions/blog";
import { IBlogDetail } from "@/lib/types";

const Edit = async ({ params }: { params: { id: string } }) => {
  const { data: blog } = await readBlogDetailById(params.id);
  return <EditForm blog={blog as IBlogDetail} />;
};

export default Edit;
