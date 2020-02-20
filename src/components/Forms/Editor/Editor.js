import React, { useState } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const TextEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const onEditorStateChange = editorState => {
    return setEditorState(editorState)
  }

  return (
    <div className="editor">
      <Editor
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={onEditorStateChange}
      />
    </div>
  )
}

export default TextEditor
