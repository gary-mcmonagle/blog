import axios from "axios";
import { Blog, BlogMetadata, CreatedBlog } from "../../types/template.types";
import { adminApiPaths } from "./paths";

export const getMetadata = async (): Promise<BlogMetadata[]> => {
  const { data } = await axios.get<BlogMetadata[]>(adminApiPaths.getAllMetadata);
  return data;
};
