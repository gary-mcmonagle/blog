import { useState } from "react";
import { BlogSaveModal } from "../../features/author/blogSaveModal";

export const Author = () => {
  const [open, setOpen] = useState<boolean>(true);
  return (
    <BlogSaveModal
      content=""
      templateId="3169155b-f9a1-4221-8a66-611d5ad4d50e"
      open={open}
      onClose={(url) => {
        setOpen(false);
      }}
    ></BlogSaveModal>
  );
};
