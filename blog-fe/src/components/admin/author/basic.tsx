import { useMemo, useRef, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { uploadImage } from '../../../api/adminApi'

type BasicAuthorProps = {
  onChange: (value: string) => void
  startValue?: string
}
export const BasicAuthor = ({ onChange, startValue }: BasicAuthorProps) => {
  const [value, setValue] = useState(startValue)
  const quillRef = useRef<any>()
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        ['image']
      ],
      handlers: {
        image: () => {
          const input = document.createElement('input')
          input.setAttribute('type', 'file')
          input.setAttribute('accept', 'image/*')
          input.click()

          input.onchange = () => {
            if (input.files) {
              const file = input.files[0]
              uploadImage(file).then(({ url }) => {
                quillRef.current.getEditor().insertEmbed(null, 'image', url)
              })

              // file type is only image.
              if (/^image\//.test(file.type)) {
                // saveToServer(file)
              } else {
                console.warn('You could only upload images.')
              }
            }
          }

          // quillRef.current.getEditor().insertEmbed(null, 'image', 'test.com')
        }
      }
    }
  }), [])
  return (
    <ReactQuill
      ref={quillRef}
      modules={modules}
      theme="snow"
      value={value}
      onChange={(val) => {
        setValue(val)
        onChange(val)
      }}
    ></ReactQuill>
  )
}
