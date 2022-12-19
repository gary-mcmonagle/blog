import * as React from "react";
import { SuccessSnack } from "../components/snackbar/snackbar";

type SnabarTypeProps = {
  open: boolean;
  setOpen: (o: boolean) => void;
  message?: string;
  setMessage: (m?: string | undefined) => void;
};
export const SnackbarContext = React.createContext<{
  success: SnabarTypeProps;
} | null>(null);

export const SnackbarProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [successOpen, setSuccessOpen] = React.useState<boolean>(false);
  const [successMessage, setSuccessMessage] = React.useState<
    string | undefined
  >();
  return (
    <SnackbarContext.Provider
      value={{
        success: {
          setOpen: setSuccessOpen,
          open: successOpen,
          message: successMessage,
          setMessage: setSuccessMessage,
        },
      }}
    >
      <SuccessSnack
        open={successOpen}
        onClose={() => {
          setSuccessOpen(false);
        }}
        message={successMessage}
      />
      {children}
    </SnackbarContext.Provider>
  );
};
