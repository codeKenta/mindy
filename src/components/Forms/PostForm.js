import React, { useState, useEffect } from 'react'
import { Form, Field } from 'react-final-form'
import { useTheme } from 'emotion-theming'
import { useSession } from '../../Firebase/Auth/Auth'
import useStorage from '../../Firebase/storage'
import styled from '@emotion/styled'
import { useExperiences } from '../../hooks/useExperiences'
import styles from '../../Styles'
import Button from '../Elements/Button'
import CheckIcon from '../Icons/check'
import DateInput from './DateInput/DateInput'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js'
import '../../Styles/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html'
import draftToMarkdown from 'draftjs-to-markdown'
import DropZone from './DropZone/DropZone'
import ImagePreview from './ImagePreview/ImagePreview'
import { stripHtml } from '../../helpers'

/* 
editor alternative
SLATE https://www.npmjs.com/package/slate 
*/

// Just trying my best
// import { stateToHTML } from 'draft-js-export-html'

// const convertCommentFromJSONToHTML = text => {
//   if (text) {
//     return stateToHTML(convertFromRaw(text))
//   }
//   // return stateToHTML(convertFromRaw(JSON.parse(text)))
// }

const PostForm = () => {
  const theme = useTheme()

  const { uid: userId } = useSession()

  const { actions, statusNames, status, statusMessage } = useExperiences()
  const [
    {
      // isLoading: uploadIsLoading,
      isError: uploadError,
      // progress: uploadProgress,
    },
    uploadFiles,
  ] = useStorage()

  const [images, setImages] = useState([])
  const [countInputs, setCountInputs] = useState(0)

  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const onEditorStateChange = editorState => {
    saveDraftToLocalStorage()
    return setEditorState(editorState)
  }

  const saveDraftToLocalStorage = () => {
    console.log('saveDraft')

    setCountInputs(countInputs + 1)

    if (countInputs > 10) {
      console.log('lets save')
      setCountInputs(0)

      const draftText = convertToRaw(editorState.getCurrentContent())
      localStorage[userId] = JSON.stringify(draftText)
    }
  }

  // init component, prefill with data if there is a edit or any draft in local storage
  useEffect(() => {
    if (localStorage[userId]) {
      const draft = JSON.parse(localStorage[userId])
      setEditorState(EditorState.createWithContent(convertFromRaw(draft)))
    }
  }, [])

  // const resetForm = () => {
  //   // TODO: RESET FORM
  //   setImages([])
  // }

  const onSubmit = async formInputs => {
    console.log('formInputs', formInputs)
    const { title, categories } = formInputs
    const date = formInputs.date
      ? new Date(formInputs.date).toISOString()
      : new Date().toISOString()

    const storyRaw = convertToRaw(editorState.getCurrentContent())
    const storyHTML = draftToHtml(storyRaw)
    const storyMarkdown = draftToMarkdown(storyRaw)

    const data = {
      title,
      date,
      story: {
        raw: JSON.stringify(storyRaw),
        html: JSON.stringify(storyHTML),
        text: stripHtml(storyHTML),
        markdown: JSON.stringify(storyMarkdown),
      },
      images: [],
      categories: categories || [],
      isPublic: false,
    }

    if (images.length > 0) {
      const storedImagesUrls = await uploadFiles(images)

      if (!uploadError && storedImagesUrls.length > 0) {
        const dataWithImages = { ...data, images: storedImagesUrls }
        actions.addExperience(dataWithImages)
      }
    } else {
      console.log('Here trigger "addExperience"')

      actions.addExperience(data)
      // TODO: try catch await ... reset form after success
    }
  }

  // useEffect(() => {
  //   const raw = convertToRaw(editorState.getCurrentContent())
  //   const html = draftToHtml(raw)
  //   const json = JSON.stringify(raw)
  // }, [editorState])

  const Label = styled.label`
    display: block;
    width: max-content;
    border-bottom: 2px solid ${theme.primary};
    margin-bottom: ${styles.space.s};
  `

  const FormGroup = styled.div`
    margin-bottom: ${styles.space.m};
    &.title {
      grid-area: titl;
    }
    &.story {
      grid-area: text;
    }
    &.date {
      grid-area: date;
    }
    &.category {
      grid-area: cate;
    }
    &.img {
      grid-area: imeg;
    }
    &.public {
      grid-area: publ;
    }

    .input.text {
      box-sizing: border-box;
      display: block;
      width: 100%;
      background: ${theme.fieldBackground};
      padding: ${styles.space.s};
      border: none;
      color: inherit;
    }
    textarea.input.text {
      height: 50vh;
      min-height: 200px;
      &::-webkit-scrollbar {
        width: 0.9rem;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #333436;
      }
    }

    .react-datepicker-wrapper {
      width: 100%;
    }
  `

  const CheckBoxWrapper = styled.label`
    margin: 5px 10px;
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;

    span {
      width: max-content;
      margin-right: 10px;
    }

    input {
      height: 1.5rem;
      width: 1.5rem;
      -webkit-appearance: none;
      -moz-appearance: none;
      -o-appearance: none;
      appearance: none;
      border: 1px solid ${theme.text};
      border-radius: ${styles.radius.s};
      outline: none;
      transition-duration: 0.3s;
      cursor: pointer;
    }

    input:checked {
      border: 1px solid ${theme.primary};
      background-color: #34495e;
    }
  `

  const CheckField = styled.div`
    display: grid;
    grid: 1rem / 1rem;
    place-items: center;
    svg,
    input {
      grid-column: 1;
      grid-row: 1;
    }
    svg {
      order: 3;
      max-width: 70%;
      max-height: 70%;
    }
  `
  const CategoriesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background: ${theme.fieldBackground};
    padding: ${styles.space.s};
  `

  // const DropZoneContainer = styled.div`
  //   display: grid;
  //   width: 100%;
  //   height: 100%;
  // `

  const ImagesContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 100px 250px;
    grid-gap: ${styles.space.l};
  `

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form, submitting }) => (
        <form
          onSubmit={async event => {
            await handleSubmit(event)
            form.reset()
          }}
        >
          <Field name="title">
            {({ input, meta }) => (
              <FormGroup className="title">
                <Label htmlFor="title">Title</Label>
                <Field
                  autoComplete="off"
                  name="title"
                  component="input"
                  className="input text"
                  // required
                />
              </FormGroup>
            )}
          </Field>

          <FormGroup className="story">
            <Label htmlFor="story">Story</Label>
            <Field
              name="story-editor"
              render={({ input }) => (
                <Editor
                  editorState={editorState}
                  wrapperClassName="demo-wrapper"
                  editorClassName="demo-editor"
                  onEditorStateChange={onEditorStateChange}
                  toolbar={{
                    options: ['inline', 'blockType', 'list', 'history'],
                    inline: {
                      inDropdown: false,
                      className: 'story-inline',
                      options: ['bold', 'italic'],
                      bold: { className: 'story-inline--bold' },
                      italic: { className: 'story-inline--italic' },
                    },
                    blockType: {
                      inDropdown: true,
                      options: ['Normal', 'H2', 'H3'],
                      className: 'story-block_type',
                    },
                    list: {
                      inDropdown: false,
                      className: 'story-list',
                      options: ['unordered', 'ordered'],
                      unordered: { className: 'story-list-ul' },
                      ordered: { className: 'story-list-ol' },
                    },
                  }}
                />
              )}
            />
          </FormGroup>

          <FormGroup className="date">
            <Label htmlFor="date">Date</Label>
            <Field
              name="date"
              render={({ input }) => (
                <DateInput className="input text" {...input} />
              )}
            />
          </FormGroup>

          <FormGroup className="category">
            <Label as="span">Category</Label>

            <CategoriesContainer>
              <CheckBoxWrapper>
                <Field
                  type="checkbox"
                  name="categories"
                  value="d"
                  render={({ input }) => (
                    <CheckBoxWrapper>
                      <span>Dream</span>
                      <CheckField>
                        {input.checked && <CheckIcon />}
                        <input {...input} />
                      </CheckField>
                    </CheckBoxWrapper>
                  )}
                />
              </CheckBoxWrapper>

              <CheckBoxWrapper>
                <Field
                  type="checkbox"
                  name="categories"
                  value="vd"
                  render={({ input }) => (
                    <CheckBoxWrapper>
                      <span>Vivid Dream</span>
                      <CheckField>
                        {input.checked && <CheckIcon />}
                        <input {...input} />
                      </CheckField>
                    </CheckBoxWrapper>
                  )}
                />
              </CheckBoxWrapper>

              <CheckBoxWrapper>
                <Field
                  type="checkbox"
                  name="categories"
                  value="ld"
                  render={({ input }) => (
                    <CheckBoxWrapper>
                      <span>Lucid Dream</span>
                      <CheckField>
                        {input.checked && <CheckIcon />}
                        <input {...input} />
                      </CheckField>
                    </CheckBoxWrapper>
                  )}
                />
              </CheckBoxWrapper>

              <CheckBoxWrapper>
                <Field
                  type="checkbox"
                  name="categories"
                  value="sp"
                  render={({ input }) => (
                    <CheckBoxWrapper>
                      <span>Sleep Paralysis</span>
                      <CheckField>
                        {input.checked && <CheckIcon />}
                        <input {...input} />
                      </CheckField>
                    </CheckBoxWrapper>
                  )}
                />
              </CheckBoxWrapper>

              <CheckBoxWrapper>
                <Field
                  type="checkbox"
                  name="categories"
                  value="obe"
                  render={({ input }) => (
                    <CheckBoxWrapper>
                      <span>OBE</span>
                      <CheckField>
                        {input.checked && <CheckIcon />}
                        <input {...input} />
                      </CheckField>
                    </CheckBoxWrapper>
                  )}
                />
              </CheckBoxWrapper>

              <CheckBoxWrapper>
                <Field
                  type="checkbox"
                  name="categories"
                  value="ap"
                  render={({ input }) => (
                    <CheckBoxWrapper>
                      <span>Astral Projection</span>
                      <CheckField>
                        {input.checked && <CheckIcon />}
                        <input {...input} />
                      </CheckField>
                    </CheckBoxWrapper>
                  )}
                />
              </CheckBoxWrapper>

              <CheckBoxWrapper>
                <Field
                  type="checkbox"
                  name="categories"
                  value="m"
                  render={({ input }) => (
                    <CheckBoxWrapper>
                      <span>Meditation</span>
                      <CheckField>
                        {input.checked && <CheckIcon />}
                        <input {...input} />
                      </CheckField>
                    </CheckBoxWrapper>
                  )}
                />
              </CheckBoxWrapper>

              <CheckBoxWrapper>
                <Field
                  type="checkbox"
                  name="categories"
                  value="other"
                  render={({ input }) => (
                    <CheckBoxWrapper>
                      <span>Other</span>
                      <CheckField>
                        {input.checked && <CheckIcon />}
                        <input {...input} />
                      </CheckField>
                    </CheckBoxWrapper>
                  )}
                />
              </CheckBoxWrapper>
            </CategoriesContainer>
          </FormGroup>

          <FormGroup className="img">
            <Label as="span">Images</Label>
            <ImagesContainer>
              {/* <DropZoneContainer> */}
              <DropZone images={images} handleImages={setImages} />
              {/* </DropZoneContainer> */}
              <ImagePreview images={images} />
            </ImagesContainer>
          </FormGroup>
          {/* <FormGroup className="public">
            <Label htmlFor="is-public">Private / public</Label>
            <span>Do you want to share your experience?</span>

            <Field
              type="checkbox"
              name="isPublic"
              value={true}
              render={({ input }) => (
                <CheckBoxWrapper className="" as="div">
                  <CheckField>
                    {input.checked && <CheckIcon />}
                    <input id="is-public" {...input} />
                  </CheckField>
                </CheckBoxWrapper>
              )}
            />
          </FormGroup> */}
          <Button disabled={submitting}>save</Button>
          {status === statusNames.addExperienceSuccess ? (
            <p>{statusMessage}</p>
          ) : null}
        </form>
      )}
    />
  )
}

export default PostForm
