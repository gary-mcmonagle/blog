import {
  Button,
  Card,
  Dialog,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useState } from "react";
import { AddTextContent } from "../../../components/Admin/Authoring/AddTextContent";

type BlockCoOrd = {
  x: number;
  y: number;
};

type TextContentProps = {
  isEditing: boolean;
  htmlContent: string;
  setTextContent: (val: string) => void;
  setEdit: () => void;
};
const TextContent = ({
  isEditing,
  htmlContent,
  setTextContent,
  setEdit,
}: TextContentProps) => {
  return (
    <Card>
      {!isEditing && (
        <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
      )}
      {isEditing && (
        <AddTextContent
          onChange={setTextContent}
          startValue={htmlContent}
        ></AddTextContent>
      )}
      {!isEditing && <Button onClick={setEdit}>Edit</Button>}
    </Card>
  );
};

const RowConfigSelectionDialog = ({
  open,
  setToClose,
  setRequiredColumnsOnNewRow,
}: {
  open: boolean;
  setToClose: () => void;
  setRequiredColumnsOnNewRow: (num: number) => void;
}) => {
  return (
    <Dialog open={open} onClose={setToClose}>
      <FormControl>
        <FormLabel>Columns</FormLabel>
        <RadioGroup
          defaultValue={1}
          onChange={(event) => {
            setRequiredColumnsOnNewRow(parseInt(event.target.value));
          }}
        >
          <FormControlLabel value={1} control={<Radio />} label="1" />
          <FormControlLabel value={2} control={<Radio />} label="2" />
          <FormControlLabel value={3} control={<Radio />} label="3" />
          <FormControlLabel value={4} control={<Radio />} label="4" />
        </RadioGroup>
      </FormControl>
    </Dialog>
  );
};

export const GridAuthor = () => {
  const [contentBlocks, setContentBlocks] = useState<string[][]>([]);
  const [editingBlock, setEditingBlock] = useState<BlockCoOrd>({ x: 0, y: 0 });
  const [rowConfigDialogOpen, setRowConfigDialogOpen] =
    useState<boolean>(false);
  const [requiredColumnsOnNewRow, setRequiredColumnsOnNewRow] =
    useState<number>(1);

  const addNewRow = () => {
    const next = [];
    for (let i = 0; i < requiredColumnsOnNewRow; i++) {
      next.push("");
    }
    setRowConfigDialogOpen(false);
    setEditingBlock({ x: 0, y: contentBlocks.length});
    setContentBlocks([...contentBlocks, next]);
  }

  return (
    <Grid container>
      <RowConfigSelectionDialog
        open={rowConfigDialogOpen}
        setToClose={() => {
          addNewRow()
        }}
        setRequiredColumnsOnNewRow={setRequiredColumnsOnNewRow}
      />
      {contentBlocks.map((contentRow, yidx) => (
        <Grid item xs={12} key={yidx}>
          <Grid container justifyContent={"space-between"} spacing={2}>
            {contentRow.map((cb, xidx) => (
              <Grid item xs={12 / contentRow.length} key={`${xidx}-${yidx}`}>
                <TextContent
                  isEditing={editingBlock.x === xidx && editingBlock.y === yidx}
                  htmlContent={cb}
                  setTextContent={(val) => {
                    contentBlocks[yidx][xidx] = val;
                  }}
                  setEdit={() => setEditingBlock({ x: xidx, y: yidx })}
                ></TextContent>
              </Grid>
            ))}
          </Grid>
        </Grid>
      ))}
      <Divider />
      <Grid item xs={12}>
        <Button
          onClick={() => {
            setRowConfigDialogOpen(true);
          }}
        >
          Add new row
        </Button>
      </Grid>
    </Grid>
  );
};
