import { createBlog, updateBlog } from '../api/adminApi'
import { CreateBlogRequest } from '../types/api/admin'

export const saveBlog = async (blogToSave: CreateBlogRequest, id?: string) => {
  const isUpdate = !!id
  if (isUpdate) {
    return await updateBlog(blogToSave, id)
  }
  return await createBlog(blogToSave)
}
