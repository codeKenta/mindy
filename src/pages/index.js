import React from 'react'
import Layout from '../components/Layout/layout'
import AuthRequired from '../Auth/AuthRequired'
import NewPost from '../components/NewPost/NewPost'
import Experiences from '../components/Experiences/Experiences'
const IndexPage = () => {
  return (
    <Layout>
      <AuthRequired>
        <NewPost />
        <Experiences />
      </AuthRequired>
    </Layout>
  )
}

export default IndexPage
