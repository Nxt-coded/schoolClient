import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditorInspector from "@ckeditor/ckeditor5-inspector";
import { useState } from "react";

const Editor = () => {
  const [state, setState] = useState("");
  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        // data=""
        // onReady={(editor) => {
        //   console.log("CKEditor React Component is ready to use!", editor);
        //   CKEditorInspector.attach(editor);
        // }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setState(data);
        }}
      />
      <div className="mt-20" />
      <div>{state}</div>
    </div>
  );
};

export default Editor;
