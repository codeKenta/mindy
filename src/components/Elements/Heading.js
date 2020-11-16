import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import styles from '@styling'
import { useTheme } from 'emotion-theming'

const Heading = ({ children, className, level }) => {
  const theme = useTheme()

  const StyledHeading = styled.h1(
    props => `
    margin: 0;
    color: ${theme.primary};
    lineHeight: ${styles.font.lineHeights.heading}
    ${props.fontSize ? `font-size: ${props.fontSize};` : null}
    ${props.marginBottom && `margin-bottom: ${props.marginBottom};`}
  `
  )

  const sizes = styles.font.fontSize
  let fontSize
  let marginBottom

  switch (level) {
    case 1:
      fontSize = sizes.h1
      marginBottom = '2rem'
      break

    case 2:
      fontSize = sizes.h2
      break

    case 3:
      fontSize = sizes.h3
      break

    case 4:
      fontSize = sizes.h4
      break

    case 5:
      fontSize = sizes.h5
      break

    case 6:
      fontSize = sizes.h6
      break

    default:
      break
  }

  return (
    <StyledHeading
      as={`h${level}`}
      className={className}
      fontSize={fontSize}
      level={level}
      marginBottom={marginBottom}
    >
      {children}
    </StyledHeading>
  )
}

Heading.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  level: PropTypes.number.isRequired,
}

Heading.defaultProps = {
  className: '',
}

export default Heading
