import React from "react"

import Layout from "../components/layout"
import { useStitchAuth } from "../Auth/StitchAuth"
import SEO from "../components/seo"
import LoginComponent from "../Auth/LoginComponent"

const IndexPage = () => {
  const {
    isLoggedIn,
    actions: { handleLogout },
  } = useStitchAuth()

  return (
    <Layout>
      <nav>
        <span>mindy-app</span>
      </nav>
      <SEO title="Home" />
      {isLoggedIn ? <p>Secret page</p> : <LoginComponent />}
    </Layout>
  )
}

export default IndexPage
