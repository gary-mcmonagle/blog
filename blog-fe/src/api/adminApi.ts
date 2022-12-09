import {
  CreateBlogRequest,
  GetAllBlogResponse,
  SaveBlogResponse,
  UpdateBlogRequest,
} from "../types/api/admin";
import axios from "axios";

const adminApibasePath = process.env.REACT_APP_API_BASE_URL;

export const getAllBlogs = async (): Promise<GetAllBlogResponse> => {
  const { data } = await axios.get<GetAllBlogResponse>(
    `${adminApibasePath}/api/blog`
  );
  return data;
};

export const createBlog = async (
  blog: CreateBlogRequest
): Promise<SaveBlogResponse> => {
  const { data } = await axios.post<SaveBlogResponse>(
    `${adminApibasePath}/api/CreateBlog`,
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
