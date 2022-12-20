import { LinearProgress, Paper } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getBlog } from '../api/publicApi'
import { Basic } from '../features/blog/templates/basic'
import { GetBlogResponse } from '../types/api/public'

export const Blog = () => {
  const { slug = '' } = useParams()
  const [blog, setBlog] = useState<GetBlogResponse | undefined>()
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    getBlog(slug).then((d) => {
      setBlog(d)
      setLoading(false)
    }).catch(() => {})
  })
  return (
    <Paper style={{ minHeight: '100vh' }}>
      {loading && <LinearProgress />}
      {!(blog == null) && <Basic content={blog.content} />}
    </Paper>
  )
}
