import React from 'react'
import { Router } from '@reach/router'
import Layout from '../components/Layout/Layout'
import AuthRequired from '../Firebase/Auth/AuthRequired'
import StoryFormPage from '../components/StoryFormPage/StoryFormPage'
import { useTheme } from 'emotion-theming'

const IndexPage = () => {
  const theme = useTheme()
  return (
    <Layout background={theme.sectionBackground}>
      <AuthRequired>
        <Router basepath="/">
          <StoryFormPage path="/new-story" />
          <StoryFormPage path="/edit-story/:docId" />
        </Router>
      </AuthRequired>
    </Layout>
  )
}

export default IndexPage
