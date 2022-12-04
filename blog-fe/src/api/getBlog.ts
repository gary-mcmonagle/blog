import axios from "axios";
import { Blog } from "../types/template.types";
import { apiPaths } from "./paths";

export const getBlog = async (slug: string): Promise<Blog | null> => {
  try {
    const { data } = await axios.get<Blog>(apiPaths.getBlog(slug));
    return data;
  } catch (err: any) {
    if (err.response.status === 404) return null;
    throw err;
  }
};
