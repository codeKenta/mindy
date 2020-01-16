/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

import React from "react"
import { StitchAuthProvider } from "./src/Auth/StitchAuth"
import PropTypes from "prop-types"

export const wrapPageElement = ({ element }) => {
  return <StitchAuthProvider>{element}</StitchAuthProvider>
}

wrapPageElement.propTypes = {
  element: PropTypes.element.isRequired,
}
