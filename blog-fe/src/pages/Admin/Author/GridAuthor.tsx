import { Button, Divider, Grid } from "@mui/material";
import React, { useState } from "react";
import { AddTextContent } from "../../../components/Admin/Authoring/AddTextContent";

export const GridAuthor = () => {
  const [contentBlocks, setContentBlocks] = useState<string[]>([]);
  return (
    <Grid container>
      {contentBlocks.map((_, idx) => (
        <Grid item xs={12} key={idx}>
          <AddTextContent
            onChange={(val) => {
              contentBlocks[idx] = val;
            }}
          ></AddTextContent>
        </Grid>
      ))}
      <Divider />
      <Grid item xs={12}>
        <Button
          onClick={() => {
            setContentBlocks([...contentBlocks, ""]);
            console.log({ contentBlocks });
          }}
        >
          Add new row
        </Button>
      </Grid>
    </Grid>
  );
};
