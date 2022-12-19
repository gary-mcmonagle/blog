export type Blog = {
  template: Template
  content: any
  urlSlug: string
  title: string
  published: boolean
}

export type GetAllBlogResponse = Blog &
Array<{
  id: string
}>

export type SaveBlogRequest = CreateBlogRequest | UpdateBlogRequest

export type CreateBlogRequest = Blog

export type UpdateBlogRequest = Partial<Blog> & {}

export type SaveBlogResponse = Blog & {
  id: string
  createdAt: string
  updatedAt?: string
  publishDate?: string
}

export type Template = {
  id: string
  name: string
}

export type TemplateResponse = Template
