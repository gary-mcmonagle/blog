import { Grid, LinearProgress, Paper, Skeleton } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { getAllBlogs, updateBlog } from "../../api/adminApi";
import { EditBlogCard } from "../../components/admin/editBlogCard";
import { SaveBlogResponse } from "../../types/api/admin";

export const BlogEditList = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [blogs, setBlogs] = useState<SaveBlogResponse[]>([]);
  useEffect(() => {
    getAllBlogs().then((blogs) => {
      setBlogs(blogs);
      setIsLoading(false);
    });
  }, []);
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
                  onClick={() => {}}
                  onEdit={() => {}}
                  onDelete={() => {}}
                  onPublish={async () => {
                    const updated = await updateBlog(
                      { published: true },
                      blog.id
                    );
                    const updatedBlogs = blogs.map((b) => {
                      if (b.id === blog.id) {
                        b = updated;
                      }
                      return b;
                    });
                    setBlogs(updatedBlogs);
                    return true;
                  }}
                  onUnpublish={async () => {
                    const updated = await updateBlog(
                      { published: false },
                      blog.id
                    );
                    const updatedBlogs = blogs.map((b) => {
                      if (b.id === blog.id) {
                        b = updated;
                      }
                      return b;
                    });
                    setBlogs(updatedBlogs);
                    return true;
                  }}
                />
              </Grid>
            ))}
        </Grid>
      )}
    </Paper>
  );
};
