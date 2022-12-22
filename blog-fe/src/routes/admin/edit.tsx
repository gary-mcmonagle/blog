import { LinearProgress, Paper, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getBlog } from '../../api/adminApi'
import { BasicAuthorPage } from '../../features/author/basicAuthorPage'
import { SaveBlogResponse } from '../../types/api/admin'

export const EditBlog = () => {
  const { slug = '' } = useParams()
  const [loading, setLoading] = useState<boolean>(true)
  const [blog, setBlog] = useState<SaveBlogResponse | undefined>()
  useEffect(() => {
    getBlog(slug)
      .then(b => {
        setLoading(false)
        setBlog(b)
      })
  }, [])
  const getTemplate = () => {
    if (!blog) return <></>
    switch (blog.template.name) {
      case 'basic':
        return <BasicAuthorPage
        template={blog.template}
        content={blog.content}
        updateBlogMetadata={{ id: blog.id, urlSlug: blog.urlSlug, title: blog.title }}
        />
      default:
        return <Typography>Not found</Typography>
    }
  }
  return (
    <Paper style={{ minHeight: '100vh' }}>
        {loading && <LinearProgress />}
        {blog && getTemplate()}
        </Paper>
  )
}
