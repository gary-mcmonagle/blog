import { Box, Modal as MuiModal } from "@mui/material";
import { styled } from "@mui/system";

export type ModalProps = {
  open: boolean;
  onClose: () => void;
};

const ContentContainer = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "white",
  border: "2px solid #000",
  "box-shadow": 24,
});

export const Modal = ({
  children,
  open,
  onClose,
}: React.PropsWithChildren<ModalProps>) => {
  return (
    <MuiModal open={open} onClose={onClose}>
      <ContentContainer>{children}</ContentContainer>
    </MuiModal>
  );
};
