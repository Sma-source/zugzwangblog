"use client";
import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
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

const FormSchema = z.object({
  title: z.string().min(10, {
    message: "title is too short",
  }),
  content: z.string().min(50, {
    message: "Content is too short",
  }),
  image_url: z.string().url({
    message: "Invalid url",
  }),
  is_premium: z.boolean(),
  is_published: z.boolean(),
});

const CreateForm = () => {
  const [isPreview, setPreview] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      content: "",
      image_url: "",
      is_premium: false,
      is_published: true,
    },
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
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
              onClick={() => setPreview(!isPreview)}
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
                      <Switch />
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
                      <Switch />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button className="flex items-center gap-1">
            <DownloadIcon />
            Save
          </Button>
        </div>
        <FormField
          control={form.control}
          name="is_premium"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default CreateForm;
