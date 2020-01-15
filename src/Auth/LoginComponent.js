import React from "react"
import PropTypes from "prop-types"

import { providers } from "./StitchAuth"

import LoginButton from "./LoginButton"

export default function LoginComponent() {
  return (
    <div>
      <LoginButton provider={providers.google} />
      <LoginButton provider={providers.anonymous} />
    </div>
  )
}

LoginButton.propTypes = {
  provider: PropTypes.string.isRequired,
}
