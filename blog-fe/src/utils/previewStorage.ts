import { Blog, CreatedBlog } from "../types/template.types";

export const saveBlogToSession = (blog: Blog | CreatedBlog) => {
  sessionStorage.setItem(
    "editBlog",
    JSON.stringify(blog)
  );
}

export const getBlogFromSession = () : Blog | CreatedBlog | null => {
  const sessiomData = sessionStorage.getItem("editBlog");
  return sessiomData ? (JSON.parse(sessiomData) as any) : null;
}

export const removeBlogFromSession = ()  => {
  sessionStorage.removeItem("editBlog")
}

