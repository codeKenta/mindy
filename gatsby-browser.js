import React from "react"
import { StitchAuthProvider } from "./src/Auth/StitchAuth"
import PropTypes from "prop-types"

import GlobalStyles from "./src/components/Global/GlobalStyles"

export const wrapPageElement = ({ element }) => {
  return (
    <StitchAuthProvider>
      <GlobalStyles />
      {element}
    </StitchAuthProvider>
  )
}

wrapPageElement.propTypes = {
  element: PropTypes.element.isRequired,
}
