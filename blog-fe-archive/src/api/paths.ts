export const apiPaths = {
  getBlog: (slug: string) =>
    `${process.env.REACT_APP_API_BASE_URL}/api/blog/${slug}`,
};
