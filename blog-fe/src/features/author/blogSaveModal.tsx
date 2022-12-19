import {
  Box,
  Checkbox,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
  FormControlLabel,
  CircularProgress,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material";
import { useState } from "react";
import { Modal } from "../../components/modal/modal";
import { BlogContent } from "../../types/content";
import { isValidUrlSlug } from "../../utils/isValidUrlSlug";
import { saveBlog } from "../../utils/saveBlog";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SuccessSnack } from "../../components/snackbar/snackbar";

const Container = styled(Box)({
  padding: 10,
});

const schema = yup.object().shape({
  urlSlug: yup
    .string()
    .test(
      "url slug",
      "Please enter valid url slug",
      (val) => !!val && isValidUrlSlug(val)
    )
    .required(),
  title: yup.string().required(),
  publish: yup.bool().required(),
});

type BlogFormFields = {
  title: string;
  publish: boolean;
  urlSlug: string;
};

export type BlogSaveModalProps = {
  open: boolean;
  onClose: (redirectUrl?: string) => void;
  content: BlogContent;
  template: {
    id: string;
    name: string;
  };
  updateBlogMetadata?: {
    id: string;
    urlSlug: string;
    title: string;
  };
};

export const BlogSaveModal = (props: BlogSaveModalProps) => {
  const { open, content, template, updateBlogMetadata } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BlogFormFields>({
    resolver: yupResolver(schema),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onSubmitHandler = async (data: BlogFormFields) => {
    setIsLoading(true);
    const created = await saveBlog(
      { ...data, template, content, published: data.publish },
      updateBlogMetadata?.id
    );
    setIsLoading(false);
    reset();

    props.onClose(`/blog/${created.urlSlug}`);
  };
  return (
    <Modal
      open={open}
      onClose={() => {
        reset();
        props.onClose();
      }}
    >
      <Paper>
        <form onSubmit={handleSubmit((values) => onSubmitHandler(values))}>
          <Container>
            <Typography align="center" variant="h6">
              Save Blog
            </Typography>
            <Stack spacing={2}>
              <TextField
                {...register("urlSlug")}
                label={(errors.urlSlug?.message as string) || "Url"}
                error={!!errors.urlSlug}
                required
                fullWidth
              ></TextField>
              <TextField
                {...register("title")}
                label={(errors.title?.message as string) || "Title"}
                error={!!errors.title}
                required
                fullWidth
              ></TextField>
            </Stack>
            <Box>
              <Grid container>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox {...register("publish")} value={true} />}
                    label="Publish"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="outlined">
                    {isLoading ? (
                      <CircularProgress size={24} />
                    ) : (
                      <Typography>Save</Typography>
                    )}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </form>
      </Paper>
    </Modal>
  );
};
