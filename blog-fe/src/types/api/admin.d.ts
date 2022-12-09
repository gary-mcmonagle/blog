import { BlogContent } from "../content";

export type Blog = {
  templateId: string;
  content: any;
  urlSlug: string;
  title: string;
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
};
