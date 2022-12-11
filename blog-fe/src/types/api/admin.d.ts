import { BlogContent } from "../content";

export type Blog = {
  templateId: string;
  content: any;
  urlSlug: string;
  title: string;
  published: boolean;
};

export type GetAllBlogResponse = Blog &
  {
    id: string;
  }[];

export type SaveBlogRequest = CreateBlogRequest | UpdateBlogRequest;

export type CreateBlogRequest = Blog;

export type UpdateBlogRequest = Partial<Blog> & {};

export type SaveBlogResponse = Blog & {
  id: string;
  createdAt: string;
  updatedAt?: string;
  publishDate?: string;
};

export type TemplateResponse = {
  id: string;
  name: string;
};
