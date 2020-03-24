import React from 'react'
import Layout from '../components/Layout/layout'
import AuthRequired from '../Auth/AuthRequired'
// import AuthRequired from '../FirebaseAuth/AuthRequired'

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
