import React from 'react'
import styled from '@emotion/styled'
import styles from '../../Styles'
import { useTheme } from 'emotion-theming'
import PropTypes from 'prop-types'

const Button = ({ children, clickHandler }) => {
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
    cursor: pointer;
  `

  return <StyledButton>{children}</StyledButton>
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  clickHandler: PropTypes.func,
}

export default Button
