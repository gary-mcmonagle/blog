import { Button, Card, Divider, Grid } from "@mui/material";
import React, { useState } from "react";
import { AddTextContent } from "../../../components/Admin/Authoring/AddTextContent";

type TextContentProps = {
    isEditing: boolean
    htmlContent: string
    setTextContent: (val: string) => void
    setEdit: () => void
}
const TextContent = ({isEditing, htmlContent, setTextContent, setEdit}: TextContentProps) => {
    return (
    <Card>
        {!isEditing && 
        <div dangerouslySetInnerHTML={{__html: htmlContent}}></div>}
        {
          isEditing && 
          <AddTextContent
          onChange={setTextContent} startValue={htmlContent}
        ></AddTextContent>
        }
        {!isEditing && <Button onClick={setEdit}>Edit</Button> }
    </Card>

    )
}

export const GridAuthor = () => {
  const [contentBlocks, setContentBlocks] = useState<string[]>([]);
  const [editingBlock, setEditingBlock] = useState<number>(0);

  return (
    <Grid container>
      {contentBlocks.map((_, idx) => (
        <Grid item xs={12} key={idx}>
          <TextContent isEditing={idx === editingBlock} htmlContent={contentBlocks[idx]} setTextContent={(val) => {
            contentBlocks[idx] = val;
          }} setEdit={() => setEditingBlock(idx)}></TextContent>
        </Grid>
      ))}
      <Divider />
      <Grid item xs={12}>
        <Button
          onClick={() => {
            setContentBlocks([...contentBlocks, ""]);
            setEditingBlock(contentBlocks.length  - 1)
          }}
        >
          Add new row
        </Button>
      </Grid>
    </Grid>
  );
};
