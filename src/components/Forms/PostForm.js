import React from 'react'
import { Form, Field } from 'react-final-form'
import { useTheme } from 'emotion-theming'
import styled from '@emotion/styled'
import styles from '../../Styles'
import Button from '../Elements/Button'
import CheckIcon from '../Icons/check'
import DateInput from './DateInput/DateInput'
import Heading from '../Elements/Heading'

const PostForm = () => {
  const theme = useTheme()

  const Label = styled.label`
    display: block;
    width: max-content;
    border-bottom: 2px solid ${theme.primary};
    margin-bottom: ${styles.space.s};
  `

  const FormGroup = styled.div`
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
  `

  const CheckBoxWrapper = styled.label`
    margin-right: 10px;
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;
    margin-right: 10px;

    span {
      order: 1;
      width: max-content;
    }

    input {
      order: 2;
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

  const onSubmit = form => {
    // event.preventDefault()
    console.log('SUBMITTED', form)
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
                name="category"
                value="d"
                render={({ input }) => (
                  <CheckBoxWrapper>
                    <input {...input} />
                    <span>Dream</span>
                  </CheckBoxWrapper>
                )}
              />

              <CheckBoxWrapper>
                <Field
                  type="checkbox"
                  name="category"
                  value="vd"
                  render={({ input }) => (
                    <CheckBoxWrapper>
                      <CheckField>
                        {input.checked && <CheckIcon />}
                        <input {...input} />
                      </CheckField>
                      <span>Vivid Dream</span>
                    </CheckBoxWrapper>
                  )}
                />
              </CheckBoxWrapper>

              <CheckBoxWrapper>
                <Field
                  type="checkbox"
                  name="category"
                  value="ld"
                  render={({ input }) => (
                    <CheckBoxWrapper>
                      <CheckField>
                        {input.checked && <CheckIcon />}
                        <input {...input} />
                      </CheckField>
                      <span>Lucid Dream</span>
                    </CheckBoxWrapper>
                  )}
                />
              </CheckBoxWrapper>

              <CheckBoxWrapper>
                <Field
                  type="checkbox"
                  name="category"
                  value="sp"
                  render={({ input }) => (
                    <CheckBoxWrapper>
                      <CheckField>
                        {input.checked && <CheckIcon />}
                        <input {...input} />
                      </CheckField>
                      <span>Sleep Paralysis</span>
                    </CheckBoxWrapper>
                  )}
                />
              </CheckBoxWrapper>

              <CheckBoxWrapper>
                <Field
                  type="checkbox"
                  name="category"
                  value="obe"
                  render={({ input }) => (
                    <CheckBoxWrapper>
                      <CheckField>
                        {input.checked && <CheckIcon />}
                        <input {...input} />
                      </CheckField>
                      <span>OBE</span>
                    </CheckBoxWrapper>
                  )}
                />
              </CheckBoxWrapper>

              <CheckBoxWrapper>
                <Field
                  type="checkbox"
                  name="category"
                  value="ap"
                  render={({ input }) => (
                    <CheckBoxWrapper>
                      <CheckField>
                        {input.checked && <CheckIcon />}
                        <input {...input} />
                      </CheckField>
                      <span>Astral Projection</span>
                    </CheckBoxWrapper>
                  )}
                />
              </CheckBoxWrapper>

              <CheckBoxWrapper>
                <Field
                  type="checkbox"
                  name="category"
                  value="m"
                  render={({ input }) => (
                    <CheckBoxWrapper>
                      <CheckField>
                        {input.checked && <CheckIcon />}
                        <input {...input} />
                      </CheckField>
                      <span>Meditation</span>
                    </CheckBoxWrapper>
                  )}
                />
              </CheckBoxWrapper>

              <CheckBoxWrapper>
                <Field
                  type="checkbox"
                  name="category"
                  value="other"
                  render={({ input }) => (
                    <CheckBoxWrapper>
                      <CheckField>
                        {input.checked && <CheckIcon />}
                        <input {...input} />
                      </CheckField>
                      <span>Other</span>
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
                name="public"
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
