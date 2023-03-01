import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
import ControlLabel from "./ControlLabel";
const EditorHtml = (props: any) => {
  const editorRef: any = useRef(null);
  const log = (e) => {
    props.onChange({ target: { name: props.name, value: e } });
  };
  return (
    <ControlLabel {...props}>
      {props.readOnly || props.disabled ? (
        <div>
          <textarea
            name={props.name}
            id={props.name}
            className={props.claseName + " w-full"}
            readOnly={props.readOnly}
            value={props.value}
            disabled={props.disabled}
          />
        </div>
      ) : (
        <Editor
          apiKey="dofyqwds8065066486dlze3tlfyhzyw1f0b5c16mcntyc7kg"
          id={props.name}
          onInit={(evt, editor) => (editorRef.current = editor)}
          value={props.value}
          textareaName={props.name}
          onEditorChange={log}
          onBlur={props.onBlur}
          disabled={props.disabled}
          init={{
            height: 300,
            menubar: true,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | image " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
      )}
    </ControlLabel>
  );
};

export default EditorHtml;
