import { SnackbarContent } from "@mui/material";
import { useContext, useState } from "react";
import { SnackbarContext } from "../contexts/SnackbarProvider";

export const useSnackbar = () => {
  const {
    success: { setOpen: setSuccessOpen, setMessage },
  } = useContext(SnackbarContext)!;

  return {
    success: (message?: string) => {
      setSuccessOpen(false);
      setMessage(message);
      setSuccessOpen(true);
    },
  };
};
