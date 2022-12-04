import {
  Box,
  Button,
  CircularProgress,
  Grid,
  styled,
  Typography,
} from "@mui/material";
import { AddBlogTemplateSelection } from "../components/Admin/AddBlogTemplateSelection";
import { BlogTemplates } from "../config";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { AddBlogTemplateSelectionModal } from "./Admin/BlogTemplateSelectionModal";
import { useState } from "react";
import { useEffect } from "react";
import { getAllBlogs } from "../api/admin/getAllBlogs";
import { AdminBlogListCard } from "./Admin/AdminBlogListCard";

const AddButton = styled(Button)({
  width: "100%",
});

const ActionBarContainer = styled(Box)({
  marginTop: 10,
  marginBottom: 30,
});

const ActionsBar = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  return (
    <>
      <AddBlogTemplateSelectionModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        templates={BlogTemplates}
      />
      <ActionBarContainer>
        <Grid container>
          <Grid xs={2} item>
            <AddButton variant="outlined" onClick={() => setModalOpen(true)}>
              <AddCircleOutlineIcon />
            </AddButton>
          </Grid>
        </Grid>
      </ActionBarContainer>
    </>
  );
};

const Container = styled(Box)({
  margin: 5,
});

export const AdminPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [savedBlogs, setSavedBlogs] = useState<
    { content: any; templateId: string; title: string; urlSlug: string }[]
  >([]);

  useEffect(() => {
    getAllBlogs()
      .then((blogs) => setSavedBlogs(blogs))
      .then(() => setIsLoading(false));
  }, []);
  return (
    <Container>
      <Grid container spacing={2} justifyContent={"space-between"}>
        <Grid item xs={12}>
          <ActionsBar />
        </Grid>
        {isLoading && (
          <Grid item xs={12}>
            <CircularProgress />
          </Grid>
        )}
        {savedBlogs.map((blog) => (
          <Grid item xs={4}>
            <AdminBlogListCard blog={blog} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
