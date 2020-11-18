import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
// import styles from '@styling'
// import { useTheme } from 'emotion-theming'

const Button = styled.div`
  background: white;
  border-radius: 5px;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  max-width: 320px;
  margin: 0 auto;
  cursor: pointer;

  &:hover {
    color: #75adf7;
  }
`

const Icon = styled.img`
  height: 30px;
`

const Text = styled.p`
  width: 100%;
  text-align: center;
`
const LoginButton = ({ icon, clickHandler, text }) => {
  return (
    <Button onClick={clickHandler} role="button" tabIndex={0}>
      <Icon alt="logo" src={icon} />
      <Text>{text}</Text>
    </Button>
  )
}

export default LoginButton

LoginButton.propTypes = {
  icon: PropTypes.node.isRequired,
  text: PropTypes.string,
  clickHandler: PropTypes.func.isRequired,
}
