import { useParams } from "react-router-dom";
import { BasicBlog } from "./BasicBlog";

export const BlogPage = () => {
  let { blogSlug = "" } = useParams();
  const isPreview = blogSlug === "preview";


  const pageData = JSON.parse(sessionStorage.getItem("previewData")!)
  return (
    <>
      <BasicBlog content={pageData.content} ></BasicBlog>
    </>
  );
};
