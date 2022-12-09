import {
  Box,
  Checkbox,
  Button,
  Grid,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material";
import { useState } from "react";
import { Modal } from "../../components/modal/modal";
import { BlogContent } from "../../types/content";
import { isValidUrlSlug } from "../../utils/isValidUrlSlug";
import { saveBlog } from "../../utils/saveBlog";

export type BlogSaveModalProps = {
  open: boolean;
  onClose: (redirectUrl?: string) => void;
  content: BlogContent;
  templateId: string;
  updateBlogMetadata?: {
    id: string;
    urlSlug: string;
    title: string;
  };
};

const TextFieldInput = (props: TextFieldProps) => {
  return <TextField {...props} fullWidth margin="dense" variant="standard" />;
};

const Container = styled(Box)({
  padding: 10,
});

const TextFieldContainer = styled(Box)({
  padding: 10,
});

const ActionsContainer = styled(Box)({
  padding: 10,
});

export const BlogSaveModal = (props: BlogSaveModalProps) => {
  const { open, content, templateId, updateBlogMetadata } = props;
  const [blogMetadataFormFields, setBlogMetadataFormFields] = useState<{
    urlSlug?: string;
    title?: string;
    publish: boolean;
  }>({ ...props.updateBlogMetadata, publish: true });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showFormError, setShowFormError] = useState<boolean>(false);
  
  const onSave = async () => {
    setIsLoading(true);
    const { urlSlug, title } = blogMetadataFormFields;
    setShowFormError(true);
    if(title && urlSlug) {
        await saveBlog({ title, urlSlug, templateId, content }, updateBlogMetadata?.id);
        setIsLoading(false);
        onClose("someUrl")
    }
    else {
        setIsLoading(false);
        setShowFormError(true)
    }
  };

  const onClose = (redirect?: string) => {
    props.onClose(redirect);
  }
  return (
    <Modal
      open={open}
      onClose={() => onClose()}
    >
      <Container>
        <Typography>Save Blog</Typography>
        <TextFieldContainer>
          <Stack>
            <TextFieldInput
              error={showFormError && !blogMetadataFormFields.title}
              label="Blog Title"
              onChange={({ target }) => {
                setBlogMetadataFormFields({
                  ...blogMetadataFormFields,
                  title: target.value,
                });
              }}
            />
            <TextFieldInput
              error={
                showFormError &&
                (!blogMetadataFormFields.urlSlug ||
                  !isValidUrlSlug(blogMetadataFormFields.urlSlug))
              }
              label="Blog Url Slug"
              onChange={({ target }) => {
                setBlogMetadataFormFields({
                  ...blogMetadataFormFields,
                  urlSlug: target.value,
                });
              }}
            />
          </Stack>
        </TextFieldContainer>
        <ActionsContainer>
          <Grid container>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    value={blogMetadataFormFields.publish}
                    onChange={({ target }) => {
                      setBlogMetadataFormFields({
                        ...blogMetadataFormFields,
                        publish: target.checked,
                      });
                    }}
                  />
                }
                label="Publish"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                size="small"
                variant="outlined"
                onClick={onSave}
                disabled={isLoading}
              >
                {!isLoading ? (
                  <Typography>Save</Typography>
                ) : (
                  <CircularProgress size={24} />
                )}
              </Button>
            </Grid>
          </Grid>
        </ActionsContainer>
      </Container>
    </Modal>
  );
};
