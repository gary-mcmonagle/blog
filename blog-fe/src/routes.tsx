import { RouteObject } from 'react-router-dom'
import { Admin } from './routes/admin'
import { Author } from './routes/admin/author'
import { Blog } from './routes/blog'
export const routes: RouteObject[] = [
  {
    path: 'admin/author/:templateName',
    element: <Author></Author>
  },
  {
    path: 'admin',
    element: <Admin></Admin>
  },
  {
    path: 'blog/:slug',
    element: <Blog></Blog>
  }
]
