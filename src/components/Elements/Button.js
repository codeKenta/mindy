import React from 'react'
import styled from '@emotion/styled'
import styles from '../../Styles'
import { useTheme } from 'emotion-theming'
import PropTypes from 'prop-types'

const Button = ({ children, clickHandler, disabled }) => {
  const theme = useTheme()

  const StyledButton = styled.button`
    background: none;
    padding: ${styles.space.s};
    min-width: 100px;
    border-radius: ${styles.radius.m};
    text-align: center;
    color: ${theme.primary};
    border: 1px solid ${theme.primary};
    text-transform: uppercase;
    transition: all 500ms eas-in;
    cursor: pointer;
    &:active  {
      border: 1px solid ${theme.complement};
    }
    &:hover(:not:hover) {
      background: ${theme.primary};
      border: 1px solid ${theme.primary};
      color: ${theme.background};
    }
    &:disabled {
      border: 1px solid ${theme.disabled};
      color: ${theme.disabled};
      cursor: not-allowed;
    }
  `

  return <StyledButton disabled={disabled}>{children}</StyledButton>
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  clickHandler: PropTypes.func,
  disabled: PropTypes.bool,
}

export default Button
