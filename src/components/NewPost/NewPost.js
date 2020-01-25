import React from 'react'
import { Form, Field } from 'react-final-form'
import { useTheme } from 'emotion-theming'
import styled from '@emotion/styled'
import styles from '../../Styles'
import Button from '../Elements/Button'
import Heading from '../Elements/Heading'
import PostForm from '../Forms/PostForm'

/** @jsx jsx */
import { jsx } from '@emotion/core'

const NewPost = () => {
  return (
    <section>
      <Heading level={1}>New story</Heading>
      <PostForm />
    </section>
  )
}

export default NewPost

// https://dev.to/proticm/styling-html-checkboxes-is-super-easy-302o
