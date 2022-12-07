import { Button, Grid } from "@mui/material";
import { useState } from "react";
import { AddContent } from "../../../components/Admin/Authoring/AddContent";
import { AddTextContent } from "../../../components/Admin/Authoring/AddTextContent";
import { AddNewContentRowDialog } from "./AddNewContentRowDialog";

type ContentBlock = {
  type?: "image" | "text";
  textMarkup?: string;
  imageUrl?: string;
  editing: boolean;
};

type ContentBlockCoord = {
  x: number;
  y: number;
};

const ContentRow = ({
  rowNum,
  row,
  updateContentBlock,
}: {
  rowNum: number;
  row: ContentBlock[];
  updateContentBlock: (
    content: ContentBlock,
    location: ContentBlockCoord
  ) => void;
}) => {
  return (
    <Grid container justifyContent={"space-between"} spacing={2}>
      {row.map((cb, xidx) => (
        <Grid item xs={12 / row.length} key={`${xidx}-${row}`}>
          <ContentItem
            content={cb}
            location={{
              x: xidx,
              y: rowNum,
            }}
            updateContentBlock={updateContentBlock}
          ></ContentItem>
        </Grid>
      ))}
    </Grid>
  );
};

const TextContent = ({
  isEditing,
  setTextContent,
}: {
  isEditing: boolean;
  setTextContent: (c: string) => void;
}) => {
  return isEditing ? (
    <AddTextContent onChange={setTextContent}></AddTextContent>
  ) : (
    <></>
  );
};

const ContentItem = ({
  location,
  content,
  updateContentBlock,
}: {
  location: ContentBlockCoord;
  content: ContentBlock;
  updateContentBlock: (
    content: ContentBlock,
    location: ContentBlockCoord
  ) => void;
}) => {
  if (content.type === "text") {
    return (
      <TextContent
        isEditing={true}
        setTextContent={(c: string) => {
          updateContentBlock({ ...content, textMarkup: c }, location);
        }}
      ></TextContent>
    );
  } else if (content.type === "image") {
    return <></>;
  } else {
    return (
      <AddContent
        setContentType={(type) => {
          updateContentBlock({ ...content, type }, location);
        }}
      ></AddContent>
    );
  }
};

export const GridAuthor = () => {
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[][]>([]);
  const [rowConfigDialogOpen, setRowConfigDialogOpen] =
    useState<boolean>(false);
  const [requiredColumnsOnNewRow, setRequiredColumnsOnNewRow] =
    useState<number>(1);

  const updateContentBlock = (
    content: ContentBlock,
    location: ContentBlockCoord
  ) => {
    const updatedRow = [...contentBlocks[location.y]];
    updatedRow[location.x] = content;
    const updated = [...contentBlocks];
    updated[location.y] = updatedRow;
    setContentBlocks(updated);
  };
  return (
    <>
      <AddNewContentRowDialog
        open={rowConfigDialogOpen}
        setToClose={() => {
          const next: ContentBlock[] = [];
          for (let i = 0; i < requiredColumnsOnNewRow; i++) {
            next.push({ editing: i === 0 });
          }
          setRowConfigDialogOpen(false);
          // setEditingBlock({ x: 0, y: contentBlocks.length });
          setContentBlocks([...contentBlocks, next]);
        }}
        setRequiredColumnsOnNewRow={setRequiredColumnsOnNewRow}
      ></AddNewContentRowDialog>
      <Grid container spacing={3}>
        {contentBlocks.map((contentRow, idx) => (
          <Grid item xs={12}>
            <ContentRow
              rowNum={idx}
              row={contentRow}
              updateContentBlock={updateContentBlock}
            ></ContentRow>
          </Grid>
        ))}
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
    </>
  );
};
