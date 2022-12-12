import { Paper } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthorBase } from "../../features/author/authorBase";
import { BasicAuthorPage } from "../../features/author/basicAuthorPage";
import { BlogSaveModal } from "../../features/author/blogSaveModal";

export const Author = () => {
  const [open, setOpen] = useState<boolean>(true);
  const naviate = useNavigate();
  return (
    <Paper style={{ height: "100vh" }}>
      <BasicAuthorPage />
    </Paper>
  );
};
