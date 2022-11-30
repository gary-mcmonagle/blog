import { Fab } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { getPreviewContent } from "../../utils/previewStorage";
import { BasicBlog } from "./BasicBlog";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const BlogPage = () => {
  let { blogSlug = "" } = useParams();
  const isPreview = blogSlug === "preview";
  const previewContent = getPreviewContent();
  const { templateId = "" } = previewContent || {};
  const navigate = useNavigate();

  return (
    <>
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
            <ArrowBackIcon/>
        </Fab>
      )}
      {previewContent && (
        <BasicBlog content={previewContent.content}></BasicBlog>
      )}
    </>
  );
};
