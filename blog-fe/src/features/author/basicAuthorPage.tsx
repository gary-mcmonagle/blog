import { TextField } from "@mui/material";
import { useState } from "react";
import { BasicAuthor } from "../../components/admin/author/basic";
import { AuthorBase } from "./authorBase";

export const BasicAuthorPage = () => {
  const [content, setContent] = useState<string | null>(null);
  const templateId = "1234";
  return (
    <>
      <AuthorBase content={content} templateId={templateId} />
      <BasicAuthor
        onChange={(e) => {
          setContent(e);
        }}
      ></BasicAuthor>
    </>
  );
};
