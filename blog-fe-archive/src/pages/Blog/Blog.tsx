import { CircularProgress, Fab } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { getBlogFromSession } from "../../utils/previewStorage";
import { BasicBlog } from "./BasicBlog";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import { useEffect } from "react";
import { getBlog } from "../../api/getBlog";

export const BlogPage = () => {
  let { blogSlug = "" } = useParams();
  const isPreview = blogSlug === "preview";
  const [isLoading, setIsLoading] = useState<boolean>(!isPreview);
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    if (isPreview) {
      setContent(getBlogFromSession()?.content);
      return;
    }
    getBlog(blogSlug)
      .then((d) => {
        if (d) setContent(d.content);
      })
      .then(() => setIsLoading(false));
  });

  const previewContent = getBlogFromSession();
  const { templateId = "" } = previewContent || {};
  const navigate = useNavigate();

  return (
    <>
      {isLoading && <CircularProgress />}
      {!isLoading && !content && <p>Blog not found</p>}
      {isPreview && templateId && (
        <Fab
          style={{
            margin: 0,
            top: "auto",
            right: 20,
            bottom: 20,
            left: "auto",
            position: "fixed",
          }}
          onClick={() => {
            navigate(`/admin/author/${templateId}`);
          }}
        >
          <ArrowBackIcon />
        </Fab>
      )}
      {previewContent && <BasicBlog content={content}></BasicBlog>}
    </>
  );
};
