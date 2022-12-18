import { Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllTemplates } from "../../api/adminApi";
import { AuthorBase } from "../../features/author/authorBase";
import { BasicAuthorPage } from "../../features/author/basicAuthorPage";
import { BlogSaveModal } from "../../features/author/blogSaveModal";
import { TemplateResponse } from "../../types/api/admin";

export const Author = () => {
  const { templateName = "" } = useParams();
  const [templates, setTemplates] = useState<TemplateResponse[]>([]);
  useEffect(() => {
    getAllTemplates().then((templates) => setTemplates(templates));
  }, []);

  const getTemplate = () => {
    const template = templates.find(t => t.name === "basic");
    if(!template) {
      return;
    }
    switch (templateName) {
      case "basic":
        return <BasicAuthorPage template={template} />;
      default:
        return <Typography>Not found</Typography>;
    }
  };
  return <Paper style={{ minHeight: "100vh" }}>{getTemplate()}</Paper>;
};
