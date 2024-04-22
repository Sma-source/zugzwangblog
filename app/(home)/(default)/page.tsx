import Image from "next/image";
import { readBlog } from "@/lib/actions/blog";
import Link from "next/link";

export default async function Home() {
  let { data: blogs } = await readBlog();
  if (!blogs?.length) {
    blogs = [];
  }
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5 p-5 xl:p-0">
      {blogs.map((blog, index) => {
        const when = new Date(blog.created_at);
        return (
          <Link
            href={"/blog/" + blog.id}
            className="w-full  border-0 rounded-xl  dark:bg-graident-dark p-5 hover:ring-0 transition-all cursor-pointer space-y-5 first:lg:col-span-2 first:md:col-span-3"
            key={index}
          >
            <div className="w-full h-72 sm:w-full  md:h-64 xl:h-96  relative hover:opacity-80 transition-all">
              <Image
                priority
                src={blog.image_url}
                alt="cover"
                fill
                className="rounded-xl object-cover object-center"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="space-y-2">
              <p className="text-sm dark:text-gray-400">
                {new Intl.DateTimeFormat("fr-FR", {
                  dateStyle: "medium",
                }).format(when)}
              </p>

              <h1 className="text-2xl font-semibold dark:text-gray-300 hover:text-[#615b58] hover:underline">
                {blog.title}
              </h1>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
