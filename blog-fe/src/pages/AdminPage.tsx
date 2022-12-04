import { Box, Button, Grid, styled, Typography } from "@mui/material";
import { AddBlogTemplateSelection } from "../components/Admin/AddBlogTemplateSelection";
import { BlogTemplates } from "../config";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { AddBlogTemplateSelectionModal } from "./Admin/BlogTemplateSelectionModal";
import { useState } from "react";

const AddButton = styled(Button)({
  width: "100%",
});

const ActionBarContainer = styled(Box)({
  marginTop: 10,
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

export const AdminPage = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <ActionsBar />
      </Grid>
    </Grid>
  );
};
