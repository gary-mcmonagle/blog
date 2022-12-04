import axios from "axios";
import { Blog } from "../../types/template.types";
import { adminApiPaths } from "./paths";

export const getAllBlogs = async () : Promise<Blog[]> => {
    const { data } = await axios.get<Blog[]>(
        adminApiPaths.getAllBlogs
      );
      return data;
}