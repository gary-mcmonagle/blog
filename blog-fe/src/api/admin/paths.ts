export const adminApiPaths = {
  createBlog: `${process.env.REACT_APP_ADMIN_API_BASE_URL}/api/CreateBlog`,
  updateBlog: (id: string) => `${process.env.REACT_APP_ADMIN_API_BASE_URL}/api/blog/${id}`,
  getAllBlogs: `${process.env.REACT_APP_ADMIN_API_BASE_URL}/api/blog`,
  getAllMetadata: `${process.env.REACT_APP_ADMIN_API_BASE_URL}/api/metadata/blog`,
};
