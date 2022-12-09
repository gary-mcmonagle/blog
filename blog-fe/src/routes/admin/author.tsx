import { useState } from "react";
import { BlogSaveModal } from "../../features/author/blogSaveModal";

export const Author = () => {
  const [open, setOpen] = useState<boolean>(true);
  return (
    <BlogSaveModal
      content=""
      templateId=""
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    ></BlogSaveModal>
  );
};
