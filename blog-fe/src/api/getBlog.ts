import axios from "axios";
import { Blog } from "../types/template.types";
import { apiPaths } from "./paths";

export const getBlog = async (slug: string) : Promise<Blog> => {
  const { data } = await axios.get<Blog>(
    apiPaths.getBlog(slug)
  );
  return data;
};
