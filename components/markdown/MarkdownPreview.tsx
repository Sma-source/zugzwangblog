import React from "react";

const MarkdownPreview = ({
  content,
  className = "sm:p-10",
}: {
  content: string;
  className?: string;
}) => {
  return <div>{content} </div>;
};

export default MarkdownPreview;
