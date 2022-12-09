import {
  CreateBlogRequest,
  GetAllBlogResponse,
  SaveBlogResponse,
  UpdateBlogRequest,
} from "../types/api/admin";
import axios from "axios";

const adminApibasePath = process.env.REACT_APP_ADMIN_API_BASE_URL;

export const getAllBlogs = async (): Promise<SaveBlogResponse[]> => {
  const { data } = await axios.get<SaveBlogResponse[]>(
    `${adminApibasePath}/api/blog`
  );
  return data;
};

export const createBlog = async (
  blog: CreateBlogRequest
): Promise<SaveBlogResponse> => {
  const { data } = await axios.post<SaveBlogResponse>(
    `${adminApibasePath}/api/blog`,
    blog
  );
  return data;
};

export const updateBlog = async (
  updateBlog: UpdateBlogRequest,
  id: string
): Promise<SaveBlogResponse> => {
  const { data } = await axios.post<SaveBlogResponse>(
    `${adminApibasePath}/api/blog/${id}`,
    updateBlog
  );
  return data;
};
