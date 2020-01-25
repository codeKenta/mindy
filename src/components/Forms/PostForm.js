import React from 'react'
import { Form, Field } from 'react-final-form'
import { useTheme } from 'emotion-theming'
import styled from '@emotion/styled'
import styles from '../../Styles'
import Button from '../Elements/Button'
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

    input:checked::before {
      content: url('check-solid.svg');
      width: 1rem;
      height: 1rem;
      path {
        color: red;
      }
      display: block;
      text-align: center;
      color: ${theme.primary};
      position: absolute;
      right: 0.65rem;
      top: 0.15rem;
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
      validate={values => {
        const errors = {}
        if (!values.title) {
          errors.title = 'You need to write a title'
        }
        if (!values.story) {
          errors.story = 'You need to write your story'
        }
        if (!values.date) {
          errors.date = 'You need a date for your story'
        }
        return errors
      }}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        // )}
        // </Field>

        /* <input {...input} type="text" placeholder="Username" /> */
        /* <Field
              className="input text"
              name="title"
              id="title"
              component="input"
            /> */
        <form onSubmit={handleSubmit}>
          <Field name="title">
            {({ input, meta }) => (
              <FormGroup className="title">
                <Label>Title</Label>
                <input {...input} className="input text" type="text" />

                {meta.error && meta.touched && (
                  <ErrorText>{meta.error}</ErrorText>
                )}
              </FormGroup>
            )}
          </Field>

          <FormGroup className="story">
            <Label>Story</Label>
            <input className="input text" {...props.input} />
            {/* <textarea className="input text">{input}</textarea> */}
          </FormGroup>

          <FormGroup className="date">
            <Label htmlFor="date">Date</Label>
            <input className="input text" type="date" name="date" id="date" />
          </FormGroup>

          <FormGroup className="category">
            <Label as="span">Category</Label>

            <CategoriesContainer>
              <CheckBoxWrapper>
                <input type="checkbox" name="category" value="d" />
                <span>Dream</span>
              </CheckBoxWrapper>

              <CheckBoxWrapper>
                <input type="checkbox" name="category" value="vd" />
                <span>aaaaa aaaaa</span>
              </CheckBoxWrapper>

              <CheckBoxWrapper>
                <input type="checkbox" name="category" value="ld" />
                <span>aaaaa aaaaa</span>
              </CheckBoxWrapper>
              <CheckBoxWrapper>
                <input id="sp" type="checkbox" name="category" value="sp" />
                <span>aaaa aaaaa</span>
              </CheckBoxWrapper>

              <CheckBoxWrapper>
                <input type="checkbox" name="category" value="obe" />
                <span>aaa</span>
              </CheckBoxWrapper>

              <CheckBoxWrapper>
                <input type="checkbox" name="category" value="ap" />
                <span>Aaaaaa Paaaaaaaaa</span>
              </CheckBoxWrapper>
              <CheckBoxWrapper>
                <input type="checkbox" name="category" value="m" />
                <span>aeaaitaaaa</span>
              </CheckBoxWrapper>
              <CheckBoxWrapper>
                <input type="checkbox" name="category" value="o" />
                <span>Other</span>
              </CheckBoxWrapper>
            </CategoriesContainer>
          </FormGroup>

          <FormGroup className="img">
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
          </FormGroup>

          <FormGroup className="public">
            <Label htmlFor="puplic">Private / public</Label>
            <span>Do you want to share your experience?</span>
            <CheckBoxWrapper>
              <input type="checkbox" name="public" id="puplic" />
            </CheckBoxWrapper>
          </FormGroup>

          <Button>save</Button>
        </form>
      )}
    />
  )
}

export default PostForm
