import React, { useState, useEffect } from 'react'
import { navigate } from 'gatsby'
import { Form, Field } from 'react-final-form'
import { useTheme } from 'emotion-theming'
import { useSession } from '../../Firebase/Auth/Auth'
import { useExperiences } from '@hooks/useExperiences'

import Button from '../Elements/Button'
import EditCategories from './EditCategories/EditCategories'
import DateInput from './DateInput/DateInput'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js'
import './react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html'
import draftToMarkdown from 'draftjs-to-markdown'
import DropZone from './DropZone/DropZone'
import ImagePreview from './ImagePreview/ImagePreview'
import { stripHtml } from '../../helpers'
import FeedbackFlash from '../FeedbackFlash/FeedbackFlash'
import ClearIcon from '@material-ui/icons/Clear'
import getPostFormStyles from './getPostFormStyles'
import Categories from '@components/Categories/Categories'

const PostForm = ({ docId }) => {
  const theme = useTheme()
  const {
    Label,
    FormGroup,
    ImagesContainer,
    HasDraftInfo,
    DeleteExperienceSection,
  } = getPostFormStyles(theme)

  const { uid: userId } = useSession()

  const localStorageKey = docId ? `${userId}${docId}` : userId

  const { actions, isLoading } = useExperiences()

  const [showFeedback, setShowFeedback] = useState(false)

  /*
   * Form states and handlers
   */

  const [initialFormValues, setInitalFormValues] = useState({
    title: '',
    date: new Date(),
  })

  const [categories, setCategories] = useState([])
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

        setInitalFormValues({
          title: exp.title,
          date: new Date(exp.date),
        })

        setCategories(exp.categories)

        console.log('Categories', exp.categories)

        if (exp.images) {
          setImages(exp.images)
        }

        if (typeof exp.story === 'object') {
          setEditorState(
            EditorState.createWithContent(
              convertFromRaw(JSON.parse(exp.story.raw))
            )
          )
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
    setCategories([])
  }

  const closeFeedback = delay => {
    setTimeout(() => {
      setShowFeedback(false)
    }, delay)
  }

  const onSubmit = async formInputs => {
    setShowFeedback(true)
    const { title } = formInputs
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
      categories: categories,
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

            <FormGroup className="story">
              <Label htmlFor="story">Story</Label>

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
              <Label as="span">Categories</Label>

              <Categories
                activeCategories={categories}
                setActiveCategories={setCategories}
              />

              <EditCategories />
            </FormGroup>

            <FormGroup className="img">
              <Label as="span">Images</Label>
              <ImagesContainer>
                <DropZone images={images} handleImages={setImages} />
                <ImagePreview images={images} />
              </ImagesContainer>
            </FormGroup>

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
