import { Update } from "@mui/icons-material";
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
import { getMetadata } from "../../../api/admin/getMetadata";
import { updateBlog } from "../../../api/admin/updateBlog";

type BlogSaveModalProps = {
  open: boolean;
  onClose: () => void;
  content: any;
  templateId: string;
  savedBlogData? :{
    urlSlug: string
    title: string
    id: string
  }
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
  savedBlogData
}: BlogSaveModalProps) => {
  const [showErrors, setShowErrors] = useState<boolean>(false);
  const [blogTitle, setBlogTitle] = useState<string>(savedBlogData?.title || '');
  const [urlSlug, setUrlSlug] = useState<string>(savedBlogData?.urlSlug || "");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const isUpdate = !!savedBlogData;

  const isUniqueSlug = async (slug: string) : Promise<boolean> => {
    const metadata =  await getMetadata();
    return !metadata.map(m => m.urlSlug).includes(slug);
  }

  const submit = async () => {
    if (!urlSlug) {
      setShowErrors(true);
      return;
    }
    setIsSubmitting(true);
    const isUniqueSlugg = await isUniqueSlug(urlSlug);
    if(!isUpdate && !isUniqueSlugg) {
      throw new Error("not unique")
    }
    if(isUpdate) {
      await updateBlog({
        templateId,
        content,
        urlSlug,
        title: blogTitle,
      }, savedBlogData.id)
    }
    else  {
      await createBlog({
        templateId,
        content,
        urlSlug,
        title: blogTitle,
      })
    }
    setIsSubmitting(false);
    onClose();
  }

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
              onClick={() => submit()}
            >
              {isUpdate ? "Update" : "Submit"}
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
