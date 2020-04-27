import React, { useState, useEffect } from 'react'
import { Form, Field } from 'react-final-form'
import { useTheme } from 'emotion-theming'
import { useSession } from '../../Firebase/Auth/Auth'
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
import FeedbackFlash from '../FeedbackFlash/FeedbackFlash'

const PostForm = ({ docId }) => {
  const theme = useTheme()

  const { uid: userId } = useSession()

  const { actions, statusNames, status, statusMessage } = useExperiences()

  const [showFeedback, setShowFeedback] = useState(false)

  /*
   * Form states and handlers
   */

  const [initialFormValues, setInitalFormValues] = useState({
    title: '',
    date: new Date(),
    categories: [],
  })

  const [storySimpleText, setStorySimpleText] = useState(null)

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

  const initFormWithExperience = async () => {
    if (docId) {
      const exp = await actions.getExperience(docId)

      console.log('exisitn exp', exp)
      // TODO: Save the reuslt to state

      setInitalFormValues({
        title: exp.title,
        date: new Date(exp.date),
        categories: exp.categories,
      })

      if (exp.images) {
        console.log('IF IMAGES in init postform')
        setImages(exp.images)
      }

      if (typeof exp.story === 'object') {
        setEditorState(
          EditorState.createWithContent(
            convertFromRaw(JSON.parse(exp.story.raw))
          )
        )
      }
      if (typeof exp.story === 'string') {
        setStorySimpleText(exp.story)
      }

      /**
       *  6. Check the local storage check. Easy fix, just dont save local storage if there is edit dvs if docId
       */
    }
  }

  // init component, prefill with data if there is a edit or any draft in local storage
  useEffect(() => {
    initFormWithExperience()
    if (!docId && localStorage[userId]) {
      const draft = JSON.parse(localStorage[userId])
      setEditorState(EditorState.createWithContent(convertFromRaw(draft)))
    }
  }, [])

  // const resetForm = () => {
  //   // TODO: RESET FORM
  //   setImages([])
  // }

  const onSubmit = async formInputs => {
    setShowFeedback(true)
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
      images: images,
      categories: categories || [],
      isPublic: false,
    }

    if (docId) {
      // Update
      actions.updateExperience(docId, data)
    } else {
      // Add
      actions.addExperience(data)
    }
  }

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

  const ImagesContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 100px 250px;
    grid-gap: ${styles.space.l};
  `

  return (
    <>
      {showFeedback && <FeedbackFlash />}
      <Form
        initialValues={initialFormValues}
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
                  />
                </FormGroup>
              )}
            </Field>
            {storySimpleText && <p>storySimpleText</p>}
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
                    stripPastedStyles={true}
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
                  <DateInput
                    className="input text"
                    initialDate={initialFormValues.date}
                    {...input}
                  />
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
                    initialValue={initialFormValues.categories.includes('d')}
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
                    initialValue={initialFormValues.categories.includes('vd')}
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
                    initialValue={initialFormValues.categories.includes('ld')}
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
                    initialValue={initialFormValues.categories.includes('sp')}
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
                    initialValue={initialFormValues.categories.includes('obe')}
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
                    initialValue={initialFormValues.categories.includes('ap')}
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
                    initialValue={initialFormValues.categories.includes('m')}
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
                    initialValue={initialFormValues.categories.includes(
                      'other'
                    )}
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
                <DropZone images={images} handleImages={setImages} />
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
    </>
  )
}

export default PostForm
