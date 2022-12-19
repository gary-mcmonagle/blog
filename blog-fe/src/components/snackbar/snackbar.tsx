import {
  Alert,
  AlertTitle,
  Snackbar,
  SnackbarProps,
  Typography,
} from "@mui/material";

type SuccessSnackProps = SnackbarProps & {
  message?: string;
};

export const SuccessSnack = (props: SuccessSnackProps) => {
  return (
    <Snackbar {...props} autoHideDuration={2000}>
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        <Typography>{props.message}</Typography>
      </Alert>
    </Snackbar>
  );
};
