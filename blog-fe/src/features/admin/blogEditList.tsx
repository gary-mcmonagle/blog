import { Grid, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllBlogs } from "../../api/adminApi";
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
          {blogs.map((blog) => (
            <Grid item xs={12} md={4}>
              <EditBlogCard
                blog={blog}
                onClick={() => {}}
                onEdit={() => {}}
                onDelete={() => {}}
                onPublish={() => {}}
                onUnpublish={() => {}}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};
