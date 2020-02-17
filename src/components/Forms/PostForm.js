import React from 'react'
import { Form, Field } from 'react-final-form'
import { useTheme } from 'emotion-theming'
import { useStitchAuth } from '../../Auth/StitchAuth'
import { useExperiences } from '../../store'

import styled from '@emotion/styled'
import styles from '../../Styles'
import Button from '../Elements/Button'
import CheckIcon from '../Icons/check'
import DateInput from './DateInput/DateInput'

const PostForm = () => {
  const theme = useTheme()
  const { currentUser } = useStitchAuth()
  const { actions } = useExperiences(currentUser.id)

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
    margin-right: 10px;
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;
    margin-right: 10px;

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
    grid: 1fr / 1fr;
    place-items: center;
    svg,
    input {
      grid-column: 1;
      grid-row: 1;
    }
    svg {
      order: 3;
      max-width: 60%;
      max-height: 60%;
    }
  `
  const CategoriesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background: ${theme.fieldBackground};
    padding: ${styles.space.s};
  `

  const ErrorText = styled.span`
    color: hotpink;
  `

  const onSubmit = formInputs => {
    // event.preventDefault()

    const { title, story, categories, isPublic } = formInputs

    const date = formInputs.date ? new Date(formInputs.date) : new Date()

    const data = {
      title,
      story,
      date,
      categories: categories || [],
      isPublic: Boolean(isPublic),
    }
    console.log('SUBMITTED', formInputs)
    console.log('data', data)

    actions.addExperience(data)
  }
  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          <Field name="title">
            {({ input, meta }) => (
              <FormGroup className="title">
                <Label htmlFor="title">Title</Label>
                <Field
                  autoComplete="off"
                  name="title"
                  component="input"
                  className="input text"
                  required
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
          {/* <FormGroup className="img">
            <Label as="span">Img</Label>
            <div className="uploads-container">
              <div className="image-upload outer">
                <div className="image-upload inner">img</div>
              </div>
              <div className="image-upload outer">
                <div className="image-upload inner">img</div>
              </div>
              <div className="image-upload outer">
                <div className="image-upload inner">img</div>
              </div>
            </div>
          </FormGroup> */}
          <FormGroup className="public">
            <Label htmlFor="is-public">Private / public</Label>
            <span>Do you want to share your experience?</span>
            <CheckBoxWrapper>
              <Field
                type="checkbox"
                name="isPublic"
                value={true}
                render={({ input }) => (
                  <CheckBoxWrapper>
                    <CheckField>
                      {input.checked && <CheckIcon />}
                      <input id="is-public" {...input} />
                    </CheckField>
                  </CheckBoxWrapper>
                )}
              />
            </CheckBoxWrapper>
          </FormGroup>
          <Button>save</Button>
        </form>
      )}
    />
  )
}

export default PostForm
