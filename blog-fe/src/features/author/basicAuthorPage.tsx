import { TextField } from "@mui/material";
import { useState } from "react";
import { BasicAuthor } from "../../components/admin/author/basic";
import { Template } from "../../types/api/admin";
import { AuthorBase } from "./authorBase";

export const BasicAuthorPage = ({template}: {template: Template}) => {
  const [content, setContent] = useState<string | null>(null);
  return (
    <>
      <AuthorBase content={content} template={template} />
      <BasicAuthor
        onChange={(e) => {
          setContent(e);
        }}
      ></BasicAuthor>
    </>
  );
};
