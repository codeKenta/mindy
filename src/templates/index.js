import React from 'react'
import Layout from '../components/Layout/Layout'
import AuthRequired from '../Firebase/Auth/AuthRequired'
import ExperiencesPage from '../components/ExperiencesPage/ExperiencesPage'
import StoryFormPage from '../components/StoryFormPage/StoryFormPage'
import { useTheme } from 'emotion-theming'

const IndexPage = () => {
  const theme = useTheme()

  return (
    <Layout background={theme.sectionBackground}>
      <AuthRequired>
        <ExperiencesPage />
      </AuthRequired>
    </Layout>
  )
}

export default IndexPage
