"use client";
import React, { useState, useTransition } from "react";
import Image from "next/image";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import {
  DownloadIcon,
  EyeOpenIcon,
  Pencil1Icon,
  RocketIcon,
  StarIcon,
} from "@radix-ui/react-icons";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import MarkdownPreview from "@/components/markdown/MarkdownPreview";
import { BlogFormSchema, BlogFormSchemaType } from "../../schema";

const BlogForm = ({
  onHandleSubmit,
}: {
  onHandleSubmit: (data: BlogFormSchemaType) => void;
}) => {
  const [isPreview, setPreview] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof BlogFormSchema>>({
    mode: "all",
    resolver: zodResolver(BlogFormSchema),
    defaultValues: {
      title: "",
      content: "",
      image_url: "",
      is_premium: false,
      is_published: true,
    },
  });
  function onSubmit(data: z.infer<typeof BlogFormSchema>) {
    startTransition(() => {
      onHandleSubmit(data);
    });
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full border pb-5 rounded-md"
      >
        <div className="border-b p-5 flex items-center sm:justify-between flex-wrap sm:flex-row gap-2">
          <div className="flex items-center flex-wrap gap-5">
            <span
              role="button"
              tabIndex={0}
              className="flex gap-2 items-center border px-3 py-2 rounded-md hover:border-zinc-500 transition-all bg-zinc-100 text-sm"
              onClick={() =>
                setPreview(
                  !isPreview && !form.getFieldState("image_url").invalid
                )
              }
            >
              {isPreview ? (
                <>
                  <Pencil1Icon />
                  Edit
                </>
              ) : (
                <>
                  {" "}
                  <EyeOpenIcon />
                  Preview
                </>
              )}
            </span>
            <FormField
              control={form.control}
              name="is_premium"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-1 border p-2 rounded-md bg-zinc-100">
                      <StarIcon />
                      <span className="text-sm">Premium</span>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="is_published"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-1 border p-2 rounded-md bg-zinc-100">
                      <RocketIcon />
                      <span className="text-sm">Publish</span>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className={cn(
              "flex gap-2 items-center border px-3 py-2 rounded-md border-violet-500 disabled:border-gray-800  bg-violet-600 transition-all group text-sm disabled:bg-gray-900",
              { "animate-spin": isPending }
            )}
            disabled={!form.formState.isValid}
          >
            <DownloadIcon className=" animate-bounce group-disabled:animate-none" />
            Save
          </Button>
        </div>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <>
                  <div
                    className={cn(
                      "w-full flex break-words p-2 gap-2",
                      isPreview ? "divide-x-0" : "divide-x"
                    )}
                  >
                    <Input
                      className={cn(
                        "border-none text-lg font-medium leading-relaxed focus:ring-1 ring-violet-500",
                        isPreview ? "w-0 p-0" : "w-full lg:w-1/2"
                      )}
                      placeholder="Post Title"
                      autoFocus
                      {...field}
                    />
                    <div
                      className={cn(
                        "lg:px-10",
                        isPreview
                          ? "mx-auto w-full lg:w-4/5 "
                          : " w-1/2 lg:block hidden "
                      )}
                    >
                      <h1 className="text-3xl font-bold dark:text-gray-200">
                        {form.getValues().title || "Untittle Post"}
                      </h1>
                    </div>
                  </div>
                </>
              </FormControl>

              {form.getFieldState("title").invalid && //only show error message when user is typing
                form.getValues().title && <FormMessage />}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image_url"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <>
                  <div
                    className={cn(
                      "w-full flex break-words p-2 gap-2",
                      isPreview ? "divide-x-0" : "divide-x"
                    )}
                  >
                    <Input
                      className={cn(
                        "border-none text-lg font-medium leading-relaxed focus:ring-1 ring-violet-500",
                        isPreview ? "w-0 p-0" : "w-full lg:w-1/2"
                      )}
                      placeholder="Image url"
                      autoFocus
                      {...field}
                    />
                    <div
                      className={cn(
                        "lg:px-10",
                        isPreview
                          ? "mx-auto w-full lg:w-4/5 "
                          : " w-1/2 lg:block hidden "
                      )}
                    >
                      {isPreview ? (
                        <div className="w-full h-[30rem] relative mt-10 border rounded-md">
                          <Image
                            src={form.getValues().image_url}
                            alt="preview"
                            fill
                            className=" object-cover object-center rounded-md"
                          />
                        </div>
                      ) : (
                        <p className="text-gray-600">
                          👆 click on preview to see image
                        </p>
                      )}
                    </div>
                  </div>
                </>
              </FormControl>

              {form.getFieldState("image_url").invalid && //only show error message when user is typing
                form.getValues().image_url && (
                  <div className="p-2">
                    <FormMessage />
                  </div>
                )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div
                  className={cn(
                    "w-full flex p-2 gap-2 ",
                    !isPreview ? "divide-x h-70vh" : "divide-x-0"
                  )}
                >
                  <Textarea
                    placeholder="Blog content"
                    {...field}
                    className={cn(
                      "border-none text-lg font-medium leading-relaxed focus:ring-1 ring-violet-500  h-70vh resize-none",
                      isPreview ? "w-0 p-0" : "w-full lg:w-1/2"
                    )}
                  />
                  <div
                    className={cn(
                      "overflow-scroll h-full",
                      isPreview
                        ? "mx-auto w-full lg:w-4/5 "
                        : "w-1/2 lg:block hidden"
                    )}
                  >
                    <MarkdownPreview
                      content={form.getValues().content}
                      className="lg:px-10"
                    />
                  </div>
                </div>
              </FormControl>

              {form.getFieldState("content").invalid &&
                form.getValues().content && <FormMessage />}
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default BlogForm;
