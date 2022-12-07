import { useState } from "react";
import { Button } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type AddTextContentProps = {
  onChange: (value: string) => void;
  startValue?: string;
};

export const AddTextContent = ({
  onChange,
  startValue = "",
}: AddTextContentProps) => {
  const [value, setValue] = useState(startValue);
  return (
    <>
      <ReactQuill
        modules={{
          toolbar: [
            [{ header: [false, 1, 2, 3, 4, 5, 6] }, "bold", "italic"],
            [
              { list: "ordered" },
              { list: "bullet" },
              { indent: "-1" },
              { indent: "+1" },
            ],
            ["blockquote", "code-block", "span-block", "link", "hr"],
            [
              { align: "" },
              { align: "center" },
              { align: "right" },
              { align: "justify" },
            ],
          ],
          // toolbar: [
          //   ['code-block'],
          //   [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }]
          // ]
        }}
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
