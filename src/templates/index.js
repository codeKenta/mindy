import React from 'react'
import Layout from '../components/Layout/Layout'
import AuthRequired from '../Firebase/Auth/AuthRequired'
import ExperiencesPage from '../components/ExperiencesPage/ExperiencesPage'

const IndexPage = () => {
  return (
    <Layout>
      <AuthRequired>
        <ExperiencesPage />
      </AuthRequired>
    </Layout>
  )
}

export default IndexPage
