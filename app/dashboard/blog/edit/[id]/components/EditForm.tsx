"use client";
import React from "react";
import BlogForm from "../../../components/BlogForm";
import { BlogFormSchemaType } from "@/app/dashboard/schema";
import { IBlogDetail } from "@/lib/types";

const EditForm = ({ blog }: { blog: IBlogDetail }) => {
  return <BlogForm onHandleSubmit={() => {}} />;
};

export default EditForm;
