import axios from "axios";
import { adminApiPaths } from "./paths";

export const getAllBlogs = async () => {
    const { data } = await axios.get<{ templateId: string; content: any, title: string, urlSlug: string }[]>(
        adminApiPaths.getAllBlogs
      );
      return data;
}