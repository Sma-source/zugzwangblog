"use client";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import React, { ChangeEvent, useTransition } from "react";
import { deleteBlogById } from "@/lib/actions/blog";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

const DeleteAlert = ({ blogId }: { blogId: string }) => {
  const [isPending, startTransition] = useTransition();
  const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      const result = await deleteBlogById(blogId);
      const { error } = JSON.parse(result);
      if (error?.message) {
        toast({
          title: "Fail to update ",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{error?.message}</code>
            </pre>
          ),
        });
      } else {
        toast({
          title: "Successfully delete 🎉",
        });
      }
    });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="flex gap-2 items-center" variant="outline">
          <TrashIcon />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>
            <form onSubmit={onSubmit}>
              <Button className="flex gap-2 items-center">
                <AiOutlineLoading3Quarters
                  className={cn(" animate-spin ", {
                    hidden: !isPending,
                  })}
                />{" "}
                Continue
              </Button>
            </form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAlert;
