import React from 'react'
import { Router, Link } from '@reach/router'
import Layout from '../components/Layout/Layout'
import AuthRequired from '../Firebase/Auth/AuthRequired'
import ExperiencesPage from '../components/ExperiencesPage/ExperiencesPage'
import StoryFormPage from '../components/StoryFormPage/StoryFormPage'
const IndexPage = () => {
  return (
    <Layout>
      <AuthRequired>
        <Router>
          <ExperiencesPage path="/" />
          <StoryFormPage path="/new-story" />
          <StoryFormPage path="/edit-story/:docId" />
        </Router>
      </AuthRequired>
    </Layout>
  )
}

export default IndexPage
