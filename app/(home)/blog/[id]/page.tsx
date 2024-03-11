import React from "react";
import Image from "next/image";
import { IBlog } from "@/lib/types";
import BlogContent from "../[id]/components/BlogContent";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

export const generateStaticParams = async () => {
  const { data: blog } = await fetch(
    process.env.SITE_URL + "/api/blog?id=" + "*"
  ).then((res) => res.json());
  return blog;
};

export const generateMetaData = async ({
  params,
}: {
  params: { id: string };
}) => {
  const { data: blog } = (await fetch(
    process.env.SITE_URL + "/api/blog?id=" + params.id
  ).then((res) => res.json())) as { data: IBlog };

  return {
    title: blog?.title,
    authors: {
      name: "Michael Chang",
    },
    openGraph: {
      title: blog?.title,
      url: "http://localhost:3000/blog" + params.id,
      siteName: "ZugZwang",
      images: blog?.image_url,
      type: "article",
    },
    keywords: ["géo politique", "stratégie", "blog politique"],
  };
};

const page = async ({ params }: { params: { id: string } }) => {
  const { data: blog } = (await fetch(
    process.env.SITE_URL + "/api/blog?id=" + params.id
  ).then((res) => res.json())) as { data: IBlog };

  if (!blog?.id) {
    return <h1 className="text-black">Not found</h1>;
  }

  const when = new Date(blog?.created_at);
  return (
    <div className="max-w-5xl mx-auto min-h-screen  pt-10 space-y-10">
      <div className="sm:px-10 space-y-5">
        <Link className="float-right" href="/">
          {" "}
          <Button
            variant="link"
            className="bg-[#262A33] text-xs text-white gap-1"
          >
            <ArrowLeftIcon />
            Retour au Blog
          </Button>
        </Link>
        <h1 className=" text-3xl font-bold dark:text-gray-200">
          {blog?.title}
        </h1>
        <p className="text-sm dark:text-gray-400">
          {new Intl.DateTimeFormat("fr-FR", {
            dateStyle: "medium",
          }).format(when)}
        </p>
      </div>
      <div className="w-full h-96 relative">
        <Image
          priority
          src={blog?.image_url!}
          alt="cover"
          fill
          className="object-cover object-center rounded-md border-[0.5px] border-zinc-600"
          sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <BlogContent blogId={params.id} />
    </div>
  );
};

export default page;
