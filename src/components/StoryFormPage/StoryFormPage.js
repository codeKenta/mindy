import React from 'react'
import Heading from '../Elements/Heading'
import PostForm from '../Forms/PostForm'
import { useTheme } from 'emotion-theming'
import styled from '@emotion/styled'

const NewPost = ({ docId }) => {
  const theme = useTheme()

  const Section = styled.section`
    background: ${theme.sectionBackground};
  `

  return (
    <Section>
      <Heading level={1}>New story</Heading>
      <PostForm docId={docId} />
    </Section>
  )
}

export default NewPost
