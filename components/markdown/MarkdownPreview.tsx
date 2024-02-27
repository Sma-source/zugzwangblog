import { cn } from "@/lib/utils";
import React from "react";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.min.css";

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
        
      }}
    >
      {content}
    </Markdown>
  );
};

export default MarkdownPreview;
