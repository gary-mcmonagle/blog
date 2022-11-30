type SessionTemplateData = { templateId: string; content: any };
export const getPreviewContent = () => {
  const sessiomData = sessionStorage.getItem("previewData");
  return sessiomData ? (JSON.parse(sessiomData) as SessionTemplateData) : null;
};

export const savePreviewContent = ({
  templateId,
  content,
}: SessionTemplateData) => {
  sessionStorage.setItem(
    "previewData",
    JSON.stringify({ templateId, content })
  );
};
