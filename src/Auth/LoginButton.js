import React from "react"
import PropTypes from "prop-types"

import { useStitchAuth } from "./StitchAuth"

export default function LoginButton({ provider }) {
  const { actions } = useStitchAuth()

  switch (provider) {
    case "google":
      return (
        <button
          provider={provider}
          onClick={() => actions.handleLogin(provider)}
        >
          Sign In with Google
        </button>
      )
    case "anonymous":
      return (
        <button
          provider={provider}
          onClick={() => actions.handleLogin(provider)}
        >
          Log In as a Guest User
        </button>
      )
    default:
      return null
  }
}

LoginButton.propTypes = {
  provider: PropTypes.string.isRequired,
}
