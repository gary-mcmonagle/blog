import { Grid, LinearProgress, Paper } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteBlog, getAllBlogs, updateBlog } from '../../api/adminApi'
import { EditBlogCard } from '../../components/admin/editBlogCard'
import { SaveBlogResponse } from '../../types/api/admin'

export const BlogEditList = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [blogs, setBlogs] = useState<SaveBlogResponse[]>([])
  useEffect(() => {
    getAllBlogs().then((blogs) => {
      setBlogs(blogs)
      setIsLoading(false)
    })
  }, [])
  const updateBlogInList = (updated: SaveBlogResponse) => {
    const updatedBlogs = blogs.map((b) => {
      if (b.id === updated.id) {
        b = updated
      }
      return b
    })
    setBlogs(updatedBlogs)
  }
  return (
    <Paper>
      {isLoading && <LinearProgress />}
      {!isLoading && (
        <Grid container spacing={3}>
          {blogs
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((blog, idx) => (
              <Grid item xs={12} md={4} key={idx}>
                <EditBlogCard
                  blog={blog}
                  onClick={() => {
                    const redirect = blog.published
                      ? `/blog/${blog.urlSlug}`
                      : `/admin/blog/${blog.urlSlug}`
                    navigate(redirect)
                  }}
                  onEdit={() => {}}
                  onDelete={async () => {
                    const conf = window.confirm('R U Sure ?')
                    if (conf) {
                      await deleteBlog(blog.id)
                      setBlogs(blogs.filter((b) => b.id !== blog.id))
                    }
                    return true
                  }}
                  onPublish={async () => {
                    const updated = await updateBlog(
                      { published: true },
                      blog.id
                    )
                    updateBlogInList(updated)
                    return true
                  }}
                  onUnpublish={async () => {
                    const updated = await updateBlog(
                      { published: false },
                      blog.id
                    )
                    updateBlogInList(updated)
                    return true
                  }}
                />
              </Grid>
            ))}
        </Grid>
      )}
    </Paper>
  )
}
