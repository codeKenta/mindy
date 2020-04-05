import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import Login from '../Login/Login'
import { useSession } from '../Auth'

const AuthRequired = ({ children }) => {
  const user = useSession()

  if (user) {
    return <>{children}</>
  } else return <Login />
}

AuthRequired.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default AuthRequired
