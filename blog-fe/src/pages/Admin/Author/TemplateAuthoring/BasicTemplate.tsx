import { Fab } from "@mui/material";
import { useState } from "react";
import { AddContent } from "../../../../components/Admin/Authoring/AddContent";
import { AddTextContent } from "../../../../components/Admin/Authoring/AddTextContent";
import PreviewIcon from "@mui/icons-material/Preview";
import SaveIcon from "@mui/icons-material/Save";
import { PreviewButton } from "../../../../components/Admin/Authoring/PreviewButton";
import { SaveButton } from "../../../../components/Admin/Authoring/SaveButton";
import { BlogTemplates } from "../../../../config";
import { useNavigate } from "react-router-dom";

export const BasicTemplate = ({
  startingContent = "",
}: {
  startingContent?: string;
}) => {
  const [content, setContent] = useState<string>(startingContent);
  const templateId = BlogTemplates.find((t) => t.name === "basic")?.id!;
  const navigate = useNavigate();

  return (
    <>
      <AddTextContent
        onChange={(val) => {
          setContent(val);
        }}
      ></AddTextContent>
      <PreviewButton
        onClick={() => {
          sessionStorage.setItem(
            "previewData",
            JSON.stringify({ id: templateId, content })
          );
          navigate(`/blog/preview`);

        }}
      ></PreviewButton>
      <SaveButton onClick={() => {}}></SaveButton>
    </>
  );
};
