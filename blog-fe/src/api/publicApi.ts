import axios from "axios";
import { GetBlogResponse } from "../types/api/public";

const basePath = process.env.REACT_APP_API_BASE_URL;
export const getBlog = async (urlSlug: string): Promise<GetBlogResponse> => {
  const { data } = await axios.get<GetBlogResponse>(
    `${basePath}/api/blog/${urlSlug}`
  );
  return data;
};
