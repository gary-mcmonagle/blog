import { Paper, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthorBase } from "../../features/author/authorBase";
import { BasicAuthorPage } from "../../features/author/basicAuthorPage";
import { BlogSaveModal } from "../../features/author/blogSaveModal";

export const Author = () => {
  let { templateName = "" } = useParams();
  const [open, setOpen] = useState<boolean>(true);
  const naviate = useNavigate();
  const getTemplate = () => {
    switch (templateName) {
      case "basic":
        return <BasicAuthorPage />;
      default:
        return <Typography>Not found</Typography>;
    }
  };
  return <Paper style={{ minHeight: "100vh" }}>{getTemplate()}</Paper>;
};
