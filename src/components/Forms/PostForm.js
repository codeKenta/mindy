import React, { useState } from 'react'
import { Form, Field } from 'react-final-form'
import { useTheme } from 'emotion-theming'
import { useExperiences } from '../../hooks/useExperiences'
import styled from '@emotion/styled'
import styles from '../../Styles'
import Button from '../Elements/Button'
import CheckIcon from '../Icons/check'
import DateInput from './DateInput/DateInput'
// import Editor from './Editor/Editor'
import DropZone from './DropZone/DropZone'
import ImagePreview from './ImagePreview/ImagePreview'
import useStorage from '../../Firebase/Storage'

const PostForm = () => {
  const theme = useTheme()

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

  const resetForm = () => {
    // TODO: RESET FORM
    setImages([])
  }
  const onSubmit = async formInputs => {
    const { title, story, categories } = formInputs

    if (images.length > 0) {
      // console.log('this is a image', images[0])
      // setFileData(images[0])

      const storedImagesUrl = await uploadFiles(images)

      if (!uploadError && storedImagesUrl.length > 0) {
        const date = formInputs.date
          ? new Date(formInputs.date).toISOString()
          : new Date().toISOString()

        const data = {
          title,
          story,
          date,
          images: storedImagesUrl,
          categories: categories || [],
          isPublic: false,
        }

        actions.addExperience(data)
      }
    }
  }

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
              name="story"
              render={({ input }) => (
                <textarea {...input} className="input text" />
              )}
            />
          </FormGroup>

          {/* <FormGroup className="story">
            <Label htmlFor="story">Story</Label>
            <Field name="story-editor" component={Editor} />
          </FormGroup> */}

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
