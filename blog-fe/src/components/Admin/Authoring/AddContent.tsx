import {
  Box,
  Card,
  CardActionArea,
  ClickAwayListener,
  Grid,
} from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { useState } from "react";
import ImageIcon from "@mui/icons-material/Image";
import PencilIcon from "@mui/icons-material/Create";

const NewContent = ({
  setShowTypeSelect,
}: {
  setShowTypeSelect: (setValue: boolean) => void;
}) => {
  return (
    <CardActionArea onClick={() => setShowTypeSelect(true)}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="30vh"
      >
        <AddCircleRoundedIcon></AddCircleRoundedIcon>
      </Box>
    </CardActionArea>
  );
};

const TypeSelect = (props: AddContentProps) => {
  const { setContentType } = props;
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="30vh"
    >
      <Grid container>
        <Grid item xs={6}>
          <Card>
            <CardActionArea onClick={() => setContentType("text")}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="30vh"
              >
                <PencilIcon></PencilIcon>
              </Box>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardActionArea onClick={() => setContentType("image")}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="30vh"
              >
                <ImageIcon></ImageIcon>
              </Box>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
type allowedContentTypes = "text" | "image";
type AddContentProps = {
  setContentType: (type: allowedContentTypes) => void;
};

export const AddContent = (props: AddContentProps) => {
  const [showTypeSelect, setShowTypeSelect] = useState<boolean>(false);

  return (
    <ClickAwayListener onClickAway={() => setShowTypeSelect(false)}>
      <Card>
        {!showTypeSelect && (
          <NewContent setShowTypeSelect={setShowTypeSelect}></NewContent>
        )}
        {showTypeSelect && <TypeSelect {...props}></TypeSelect>}
      </Card>
    </ClickAwayListener>
  );
};
