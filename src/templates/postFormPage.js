import React from 'react'
import Layout from '../components/Layout/Layout'
import AuthRequired from '../Firebase/Auth/AuthRequired'
import StoryFormPage from '../components/StoryFormPage/StoryFormPage'

const IndexPage = ({ docId }) => {
  return (
    <Layout>
      <AuthRequired>
        <StoryFormPage docId={docId || null} />
      </AuthRequired>
    </Layout>
  )
}

export default IndexPage
