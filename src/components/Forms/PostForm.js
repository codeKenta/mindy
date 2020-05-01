import React, { useState, useEffect } from 'react'
import { navigate } from 'gatsby'
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
import ClearIcon from '@material-ui/icons/Clear'

const PostForm = ({ docId }) => {
  const theme = useTheme()

  const { uid: userId } = useSession()

  const localStorageKey = docId ? `${userId}${docId}` : userId

  const { actions, isLoading } = useExperiences()
  const [showFeedback, setShowFeedback] = useState(false)

  const [isDeleted, setIsDeleted] = useState(false)

  /*
   * Form states and handlers
   */

  const [initialFormValues, setInitalFormValues] = useState({
    title: '',
    date: new Date(),
    categories: [],
  })

  // Remove this later when existing posts are changed to rich editor format
  const [storySimpleText, setStorySimpleText] = useState(null)

  const [images, setImages] = useState([])
  const [countInputs, setCountInputs] = useState(-20)

  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const onEditorStateChange = editorState => {
    saveDraftToLocalStorage()
    return setEditorState(editorState)
  }

  const saveDraftToLocalStorage = () => {
    setCountInputs(countInputs + 1)
    if (countInputs > 20) {
      setCountInputs(0)
      const draftText = convertToRaw(editorState.getCurrentContent())
      localStorage[localStorageKey] = JSON.stringify(draftText)
    }
  }

  const initFormWithExperience = async () => {
    if (docId) {
      try {
        const exp = await actions.getExperience(docId)

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
      } catch (error) {
        navigate('/')
      }
    }
  }

  const clearLocalStorageDraft = () => {
    if (docId && localStorageKey) {
      localStorage.removeItem(localStorageKey)
      initFormWithExperience()
    }
  }

  const initFormFromLocalStorageDraft = () => {
    if (localStorage[localStorageKey]) {
      const draft = JSON.parse(localStorage[localStorageKey])
      setEditorState(EditorState.createWithContent(convertFromRaw(draft)))
    }
  }

  // init component, prefill with data if there is a edit or any draft in local storage
  useEffect(() => {
    initFormWithExperience().then(() => {
      initFormFromLocalStorageDraft()
    })
  }, [])

  const resetForm = () => {
    setEditorState(EditorState.createEmpty())
    setImages([])
  }

  const closeFeedback = delay => {
    setTimeout(() => {
      setShowFeedback(false)
    }, delay)
  }

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
      actions.updateExperience(docId, data).then(() => {
        closeFeedback(4000)
        localStorage.removeItem(localStorageKey)
        resetForm()
      })
    } else {
      // Add
      await actions.addExperience(data)
      closeFeedback(4000)
      localStorage.removeItem(localStorageKey)
      resetForm()
    }
  }

  const handleDeleteExperience = () => {
    localStorage.removeItem(localStorageKey)
    setShowFeedback(true)

    if (docId) {
      actions.deleteExperience(docId).then(() => {
        setTimeout(() => {
          closeFeedback(3000)
          navigate('/')
        }, 4000)
      })
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

  const HasDraftInfo = styled.div`
    background: ${theme.secondary};
    border-radius: ${styles.radius.m};
    padding: ${styles.space.m};
    margin-bottom: ${styles.space.m};
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
      margin: 0;
    }
  `

  const DeleteExperienceSection = styled.div`
    border-top: 1px solid ${theme.secondary};
    margin-top: ${styles.space.xxl};
    margin-bottom: ${styles.space.xl};
    padding-top: ${styles.space.xxl};
    display: flex;
    justify-content: center;
  `

  return (
    <>
      {showFeedback && <FeedbackFlash />}
      {docId && localStorage[localStorageKey] && (
        <HasDraftInfo>
          <p>This story has unsaved updates in draft</p>
          <Button
            size={'s'}
            IconComp={ClearIcon}
            clickHandler={clearLocalStorageDraft}
          >
            clear draft
          </Button>
        </HasDraftInfo>
      )}
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
            {storySimpleText && <p>{storySimpleText}</p>}
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

            <Button disabled={submitting || isLoading}>
              {docId ? 'update' : 'save'}
            </Button>
          </form>
        )}
      />

      {docId && (
        <DeleteExperienceSection>
          <Button
            size={'s'}
            IconComp={ClearIcon}
            clickHandler={handleDeleteExperience}
          >
            delete experience
          </Button>
        </DeleteExperienceSection>
      )}
    </>
  )
}

export default PostForm
