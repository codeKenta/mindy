import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'

import { useSession } from '../Auth'

import Landing from '@components/Landing/Landing'

const AuthRequired = ({ children }) => {
  const user = useSession()

  if (user) {
    return <>{children}</>
  } else {
    navigate('/')
    return <Landing />
  }
}

AuthRequired.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default AuthRequired
