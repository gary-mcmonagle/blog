import { Grid } from "@mui/material";
import { EditBlogCard } from "../../components/admin/editBlogCard";
import { SaveBlogResponse } from "../../types/api/admin";

export const BlogEditList = () => {
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
    <Grid container spacing={3}>
      {BlogData.map((b) => (
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
  );
  //return <EditBlogCard blog={BlogData[0]} />;
};
