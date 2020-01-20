import React from "react"
import PropTypes from "prop-types"
import { useStitchAuth } from "../Auth/StitchAuth"
import LoginComponent from "../Auth/LoginComponent"

const AuthRequired = ({ children }) => {
  const { isLoggedIn } = useStitchAuth()
  return <>{isLoggedIn ? children : <LoginComponent />}</>
}

AuthRequired.propTypes = {
  children: PropTypes.element.isRequired,
}
export default AuthRequired
