import { useState } from "react";
import { Button } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type AddTextContentProps = {
  onChange: (value: string) => void;
};

export const AddTextContent = ({ onChange }: AddTextContentProps) => {
  const [value, setValue] = useState("");
  return (
    <>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={(val) => {
          setValue(val);
          onChange(val);
        }}
      />
      <Button>Done</Button>
    </>
  );
};
