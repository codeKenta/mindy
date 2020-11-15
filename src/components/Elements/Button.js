import React from 'react'
import styled from '@emotion/styled'
import styles from '@styles'

import { useTheme } from 'emotion-theming'
import PropTypes from 'prop-types'
import { lightenDarkenColor } from '../../helpers'

const Button = ({ children, clickHandler, disabled, IconComp, size = 'm' }) => {
  const theme = useTheme()

  const StyledButton = styled.button`
    background: none;
    padding: ${props =>
      props.size === 'm' ? `${styles.space.s} ${styles.space.m}` : ''};
    padding: ${props =>
      props.size === 's' ? `${styles.space.xs} ${styles.space.s}` : ''};
    font-size: ${props =>
      props.size === 's' ? `${styles.font.fontSize.xs}` : ''};
    min-width: 100px;
    border-radius: ${styles.radius.m};
    text-align: center;
    color: ${theme.primary};
    border: 1px solid ${theme.primary};
    text-transform: uppercase;
    transition: all 500ms eas-in;
    cursor: pointer;
    transition: ${styles.transitions.general};
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: ${theme.primary};
      border: 1px solid ${theme.primary};
      color: ${theme.background};
    }
    &:active  {
      background: ${lightenDarkenColor(theme.primary, 30)};
      border: 1px solid ${theme.complement};
    }

    &:disabled,
    &:disabled:hover {
      background: none;
      border: 1px solid ${theme.disabled};
      color: ${theme.disabled};
      cursor: not-allowed;
    }
  `

  const IconWrapper = styled.span`
    display: flex;
    align-items: center;
    margin-right: ${props => (props.size === 's' ? `${styles.space.xs}` : '')};
    margin-right: ${props => (props.size === 'm' ? `${styles.space.s}` : '')};
  `

  const handelClick = () => {
    if (clickHandler) {
      clickHandler()
    }
  }

  return (
    <StyledButton disabled={disabled} size={size} onClick={e => handelClick(e)}>
      {IconComp && (
        <IconWrapper size={size}>
          <IconComp />
        </IconWrapper>
      )}
      {children}
    </StyledButton>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  clickHandler: PropTypes.func,
  disabled: PropTypes.bool,
  IconComp: PropTypes.object,
  size: PropTypes.string,
}

export default Button
