import axios from "axios";
import { Blog, CreatedBlog } from "../../types/template.types";
import { adminApiPaths } from "./paths";

export const getAllBlogs = async (): Promise<CreatedBlog[]> => {
  const { data } = await axios.get<CreatedBlog[]>(adminApiPaths.getAllBlogs);
  return data;
};
