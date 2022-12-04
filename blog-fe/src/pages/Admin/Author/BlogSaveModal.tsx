import {
  Box,
  CircularProgress,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { createBlog } from "../../../api/admin/createBlog";

type BlogSaveModalProps = {
  open: boolean;
  onClose: () => void;
  content: any;
  templateId: string;
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export const BlogSaveModal = ({
  open,
  onClose,
  content,
  templateId,
}: BlogSaveModalProps) => {
  const [showErrors, setShowErrors] = useState<boolean>(false);
  const [blogTitle, setBlogTitle] = useState<string>("");
  const [urlSlug, setUrlSlug] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              error={showErrors && !urlSlug}
              autoFocus
              margin="dense"
              id="blogTitle"
              label="Blog Title"
              type="url"
              value={blogTitle}
              fullWidth
              variant="standard"
              onChange={(e) => {
                setBlogTitle(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={showErrors && !urlSlug}
              autoFocus
              margin="dense"
              id="urlSlug"
              label="URL Slug"
              type="url"
              value={urlSlug}
              fullWidth
              variant="standard"
              onChange={(e) => {
                setUrlSlug(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Button
              onClick={() => {
                if (!urlSlug) {
                  setShowErrors(true);
                  return;
                }
                setIsSubmitting(true);
                createBlog({
                  templateId,
                  content,
                  urlSlug,
                  title: blogTitle,
                }).then(() => {
                  setIsSubmitting(false);
                  onClose();
                });
              }}
            >
              Submit
            </Button>
          </Grid>
          <Grid item xs={6}>
            {isSubmitting && <CircularProgress />}
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};
