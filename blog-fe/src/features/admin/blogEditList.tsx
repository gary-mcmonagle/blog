import { Grid, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
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
    <>
      {isLoading && <Skeleton variant="rounded" width={210} height={150} />}
      {!isLoading && (
        <Grid container spacing={3}>
          {blogs.map((blog, idx) => (
            <Grid item xs={12} md={4} key={idx}>
              <EditBlogCard
                blog={blog}
                onClick={() => {}}
                onEdit={() => {}}
                onDelete={() => {}}
                onPublish={async () => {
                  console.log("here");
                  await updateBlog({ published: true }, blog.id);
                }}
                onUnpublish={async () => {
                  await updateBlog({ published: false }, blog.id);
                }}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};
