import { Grid, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllBlogs } from "../../api/adminApi";
import { EditBlogCard } from "../../components/admin/editBlogCard";
import { SaveBlogResponse } from "../../types/api/admin";

export const BlogEditList = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [blogs, setBlogs] = useState<SaveBlogResponse[]>([]);
  useEffect(() => {
    getAllBlogs()
        .then(blogs => {
            setBlogs(blogs)
            setIsLoading(false)
        })
  })
  const BlogData: SaveBlogResponse[] = [
    {
      id: "test",
      content: "blah blah",
      title: "title",
      urlSlug: "some-slug",
      templateId: "1243",
    },
    {
      id: "test",
      content: "blah blah",
      title: "title",
      urlSlug: "some-slug",
      templateId: "1243",
    },
  ];
  return (
    <>
      {isLoading && <Skeleton variant="rounded" width={210} height={150} />}
      {!isLoading && (
        <Grid container spacing={3}>
          {blogs.map((b) => (
            <Grid item xs={4}>
              <EditBlogCard
                blog={b}
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
