import { cn } from "@/lib/utils";
import React from "react";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import { CodeIcon } from "@radix-ui/react-icons";
import "highlight.js/styles/atom-one-dark.min.css";
import CopyButton from "./CopyButton";

const MarkdownPreview = ({
  content,
  className = "sm:p-10",
}: {
  content: string;
  className?: string;
}) => {
  return (
    <Markdown
      className={cn("space-y-6", className)}
      rehypePlugins={[rehypeHighlight]}
      components={{
        h1: ({ node, ...props }) => {
          return <h1 {...props} className="text-3xl font-extrabold"></h1>;
        },
        h2: ({ node, ...props }) => {
          return <h2 {...props} className="text-2xl font-bold mt-10 mb-10" />;
        },
        h3: ({ node, ...props }) => {
          return (
            <h3 {...props} className="text-xl font-semibold mt-10 mb-10" />
          );
        },
        a: ({ node, ...props }) => {
          return <a {...props} className="font-semibold underline" />;
        },
        p: ({ node, ...props }) => {
          return <p {...props} className="text-left  dark:text-gray-400" />;
        },
        code: ({ node, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || "");

          if (match?.length) {
            let Icon = CodeIcon;

            return (
              <div className=" bg-black text-gray-300 border-[0.5px] rounded-md border-zinc-500">
                <div className="flex items-center justify-between px-5 py-2 border-b-[0.5px] border-zinc-500">
                  <div className="flex items-center gap-2">
                    <Icon />
                    <p className="text-sm text-gray-300">
                      {/* @ts-ignore  */}
                      {node?.data?.meta}
                    </p>
                  </div>
                  <CopyButton />
                </div>
                <div className="overflow-x-auto w-full">
                  <div className="p-5">{children}</div>
                </div>
              </div>
            );
          } else {
            return (
              // TODO: convert to code block
              <code
                className="text-lg break-words bg-zinc-700 px-1 rounded-sm"
                {...props}
              >
                {children}
              </code>
            );
          }
        },
      }}
    >
      {content}
    </Markdown>
  );
};

export default MarkdownPreview;
