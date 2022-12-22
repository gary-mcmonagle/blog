import {
  CreateBlogRequest,
  SaveBlogResponse,
  TemplateResponse,
  UpdateBlogRequest
} from '../types/api/admin'
import axios from 'axios'

const adminApibasePath = process.env.REACT_APP_ADMIN_API_BASE_URL ?? ''

export const getAllBlogs = async (): Promise<SaveBlogResponse[]> => {
  const { data } = await axios.get<SaveBlogResponse[]>(
    `${adminApibasePath}/api/blog`
  )
  return data
}

export const getBlog = async (urlSlug: string): Promise<SaveBlogResponse> => {
  const { data } = await axios.get<SaveBlogResponse>(
    `${adminApibasePath}/api/blog/${urlSlug}`
  )
  return data
}

export const createBlog = async (
  blog: CreateBlogRequest
): Promise<SaveBlogResponse> => {
  const { data } = await axios.post<SaveBlogResponse>(
    `${adminApibasePath}/api/blog`,
    blog
  )
  return data
}

export const updateBlog = async (
  updateBlog: UpdateBlogRequest,
  id: string
): Promise<SaveBlogResponse> => {
  const { data } = await axios.post<SaveBlogResponse>(
    `${adminApibasePath}/api/blog/${id}`,
    updateBlog
  )
  return data
}

export const deleteBlog = async (id: string): Promise<void> => {
  const { data } = await axios.delete(`${adminApibasePath}/api/blog/${id}`)
  return data
}

export const getAllTemplates = async (): Promise<TemplateResponse[]> => {
  const { data } = await axios.get<TemplateResponse[]>(
    `${adminApibasePath}/api/templates`
  )
  return data
}

export const uploadImage = async (image: File): Promise<{ url: string }> => {
  const formData = new FormData()
  formData.append('File', image)
  const { data } = await axios.post(`${adminApibasePath}/api/image/${image.name}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return { url: data.url }
}
