import React from 'react'
import Layout from '../components/Layout/Layout'
import AuthRequired from '../Firebase/Auth/AuthRequired'
import NewPost from '../components/NewPost/NewPost'
import { useTheme } from 'emotion-theming'

const IndexPage = () => {
  const theme = useTheme()
  return (
    <Layout background={theme.sectionBackground}>
      <AuthRequired>
        <NewPost />
      </AuthRequired>
    </Layout>
  )
}

export default IndexPage
