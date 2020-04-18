import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const TextEditor = ({ handleRawState }) => {
  // useEffect(() => {
  //   const raw = convertToRaw(editorState.getCurrentContent())
  //   handleRawState(raw)
  // }, [editorState])
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

TextEditor.propTypes = {
  handleChange: PropTypes.func,
}

export default TextEditor
