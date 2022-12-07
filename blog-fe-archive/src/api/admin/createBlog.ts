import axios from "axios";
import { Blog } from "../../types/template.types";
import { adminApiPaths } from "./paths";

export const createBlog = async (body: Blog) => {
  await axios.post(adminApiPaths.createBlog, body);
};
