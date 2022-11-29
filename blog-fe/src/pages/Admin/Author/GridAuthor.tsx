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
import { AddContent } from "../../../components/Admin/Authoring/AddContent";
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
      <Card style={{ minWidth: 200 }}>
        <FormControl>
          <FormLabel>Columns</FormLabel>
          <RadioGroup
            defaultValue={1}
            onChange={(event) => {
              setRequiredColumnsOnNewRow(parseInt(event.target.value));
            }}
          >
            {[1, 2, 3, 4].map((cols) => (
              <FormControlLabel value={cols} control={<Radio />} label={cols} />
            ))}
          </RadioGroup>
        </FormControl>
      </Card>
    </Dialog>
  );
};

type ContentBlock = {
  type?: "image" | "text";
  textMarkup?: string;
  imageUrl?: string;
};

export const GridAuthor = () => {
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[][]>([]);
  const [editingBlock, setEditingBlock] = useState<BlockCoOrd>({ x: 0, y: 0 });
  const [rowConfigDialogOpen, setRowConfigDialogOpen] =
    useState<boolean>(false);
  const [requiredColumnsOnNewRow, setRequiredColumnsOnNewRow] =
    useState<number>(1);

  const addNewRow = () => {
    const next: ContentBlock[] = [];
    for (let i = 0; i < requiredColumnsOnNewRow; i++) {
      next.push({});
    }
    setRowConfigDialogOpen(false);
    setEditingBlock({ x: 0, y: contentBlocks.length });
    setContentBlocks([...contentBlocks, next]);
  };

  return (
    <Grid container spacing={3}>
      <RowConfigSelectionDialog
        open={rowConfigDialogOpen}
        setToClose={() => {
          addNewRow();
        }}
        setRequiredColumnsOnNewRow={setRequiredColumnsOnNewRow}
      />
      {contentBlocks.map((contentRow, yidx) => (
        <Grid item xs={12} key={yidx}>
          <Grid container justifyContent={"space-between"} spacing={2}>
            {contentRow.map((cb, xidx) => (
              <Grid item xs={12 / contentRow.length} key={`${xidx}-${yidx}`}>
                {!cb.type && (
                  <AddContent
                    setContentType={(t) => {
                      const updatedRow = [...contentRow];
                      updatedRow[xidx] = { ...cb, type: t };
                      const updated = [...contentBlocks];
                      updated[yidx] = updatedRow;
                      setContentBlocks(updated);
                    }}
                  ></AddContent>
                )}
                {cb?.type === "text" && (
                  <TextContent
                    isEditing={
                      editingBlock.x === xidx && editingBlock.y === yidx
                    }
                    htmlContent={cb.textMarkup || ""}
                    setTextContent={(val) => {
                      contentBlocks[yidx][xidx].textMarkup = val;
                    }}
                    setEdit={() => setEditingBlock({ x: xidx, y: yidx })}
                  ></TextContent>
                )}
                {cb?.type === "image" && <p>image</p>}
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
