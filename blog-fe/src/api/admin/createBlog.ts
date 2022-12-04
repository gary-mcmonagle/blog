import axios from "axios";
import { adminApiPaths } from "./paths";

export const createBlog = async (body: {
  templateId: string;
  content: any;
  urlSlug: string;
  title: string;
}) => {
  await axios.post(adminApiPaths.createBlog, body);
};
