import axios from "axios";
import { Blog } from "../../types/template.types";
import { adminApiPaths } from "./paths";

export const updateBlog = async (body: Blog, id: string) => {
  await axios.post(adminApiPaths.updateBlog(id), body);
};
