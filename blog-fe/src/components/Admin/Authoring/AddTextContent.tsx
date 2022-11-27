import { useState } from "react";
import { Button } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type AddTextContentProps = {
  onChange: (value: string) => void;
  startValue?: string;

};

export const AddTextContent = ({ onChange, startValue = "" }: AddTextContentProps) => {
  const [value, setValue] = useState(startValue);
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
    </>
  );
};
