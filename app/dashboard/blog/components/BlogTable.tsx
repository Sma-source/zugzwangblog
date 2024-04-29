import { Button } from "@/components/ui/button";
import { EyeOpenIcon, Pencil1Icon } from "@radix-ui/react-icons";
import React from "react";
import { readBlogAdmin, updateBlogById } from "@/lib/actions/blog";
import DeleteAlert from "./DeleteAlert";
import SwitchForm from "./SwitchForm";
import { BlogFormSchemaType } from "../../schema";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const BlogTable = async () => {
  const { data: blogs } = await readBlogAdmin();
  return (
    <Card className="overflow-y-scroll">
      {/* <CardHeader>
        <CardTitle>Blogs</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader> */}
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Premium</TableHead>
              <TableHead className="hidden md:table-cell">Publish</TableHead>

              <TableHead className="hidden md:table-cell">Created at</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogs?.map((blog, index) => {
              const updatePremium = updateBlogById.bind(null, blog.id, {
                is_premium: !blog.is_premium,
              } as BlogFormSchemaType);
              const updatePublish = updateBlogById.bind(null, blog.id, {
                is_published: !blog.is_published,
              } as BlogFormSchemaType);
              const when = new Date(blog.created_at);
              return (
                <TableRow key={index}>
                  <TableCell className="font-medium">{blog.title}</TableCell>
                  <TableCell>
                    <SwitchForm
                      checked={blog.is_premium}
                      name="premium"
                      onToggle={updatePremium}
                    />
                  </TableCell>
                  <TableCell>
                    <SwitchForm
                      checked={blog.is_published}
                      name="published"
                      onToggle={updatePublish}
                    />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {new Intl.DateTimeFormat("fr-FR", {
                      dateStyle: "short",
                    }).format(when)}
                  </TableCell>
                  <Actions blogId={blog.id} />
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>32</strong> products
        </div>
      </CardFooter>
    </Card>
  );
};

const Actions = ({ blogId }: { blogId: string }) => {
  return (
    <TableCell>
      <AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link href={`/dashboard/blog/edit/${blogId}`}>Edit</Link>
            </DropdownMenuItem>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </AlertDialogTrigger>
            <DropdownMenuItem>
              <Link href={`/blog/${blogId}`}>View</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DeleteAlert blogId={blogId} />
      </AlertDialog>
    </TableCell>
    // <div className="flex items-center gap-2 md:flex-wrap ">
    //   <Link href={`/blog/${blogId}`}>
    //     <Button className="flex gap-2  items-center" variant="outline">
    //       <EyeOpenIcon />
    //       View
    //     </Button>
    //   </Link>
    //   <DeleteAlert blogId={blogId} />
    //   <Link href={`/dashboard/blog/edit/${blogId}`}>
    //     <Button className="flex gap-2 items-center" variant="outline">
    //       <Pencil1Icon />
    //       Edit
    //     </Button>
    //   </Link>
    // </div>
  );
};

export default BlogTable;
