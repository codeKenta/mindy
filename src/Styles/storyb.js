import React from 'react'
import { Router, Link } from '@reach/router'
import Layout from '../components/Layout/Layout'
import AuthRequired from '../Firebase/Auth/AuthRequired'
import NewPost from '../components/StoryFormPage/StoryFormPage'
import { useTheme } from 'emotion-theming'

const IndexPage = () => {
  const theme = useTheme()
  return (
    <Layout background={theme.sectionBackground}>
      <AuthRequired>
        <Router>
          <NewPost path="/abc" />
        </Router>
      </AuthRequired>
    </Layout>
  )
}

export default IndexPage
