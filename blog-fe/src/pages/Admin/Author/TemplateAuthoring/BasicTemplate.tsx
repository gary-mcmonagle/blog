import { useState } from "react";
import { AddTextContent } from "../../../../components/Admin/Authoring/AddTextContent";
import { PreviewButton } from "../../../../components/Admin/Authoring/PreviewButton";
import { SaveButton } from "../../../../components/Admin/Authoring/SaveButton";
import { BlogTemplates } from "../../../../config";
import { useNavigate } from "react-router-dom";
import {
  getPreviewContent,
  savePreviewContent,
} from "../../../../utils/previewStorage";
import { BlogSaveModal } from "../BlogSaveModal";

export const BasicTemplate = () => {
  const pageData = getPreviewContent();
  const templateId = BlogTemplates.find((t) => t.name === "basic")?.id!;
  const defaultContent =
    pageData?.templateId === templateId ? pageData?.content : "";

  const [content, setContent] = useState<string>(defaultContent);
  const [saveModalOpen, setSaveModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <>
      <BlogSaveModal
        content={content}
        templateId={templateId}
        open={saveModalOpen}
        onClose={() => setSaveModalOpen(false)}
      ></BlogSaveModal>
      <AddTextContent
        onChange={(val) => {
          setContent(val);
        }}
        startValue={defaultContent}
      ></AddTextContent>
      <PreviewButton
        onClick={() => {
          savePreviewContent({ content, templateId });
          navigate(`/blog/preview`);
        }}
      ></PreviewButton>
      <SaveButton
        onClick={() => {
          setSaveModalOpen(true);
        }}
      ></SaveButton>
    </>
  );
};
