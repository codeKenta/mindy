import React from "react"
import Layout from "../components/Layout/layout"

import AuthRequired from "../Auth/AuthRequired"
import NewPost from "../components/NewPost/NewPost"

const IndexPage = () => {
  return (
    <Layout>
      <AuthRequired>
        <NewPost />
      </AuthRequired>
    </Layout>
  )
}

export default IndexPage
