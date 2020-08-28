import React from 'react'
import { css, Global } from '@emotion/core'
import styles from '../../Styles'
import { useTheme } from 'emotion-theming'

const GlobalStyles = () => {
  const theme = useTheme()
  return (
    <Global
      styles={css`
        * {
          box-sizing: border-box;
        }
        body {
          margin: 0;
          font-size: ${styles.font.fontSize.s};
          font-family: ${styles.font.fontFamily.body};
          background: ${theme.background};
          color: ${theme.text};
          line-height: ${styles.font.lineHeights.body};
          letter-spacing: 0.1rem;
        }
        @media (min-width: ${styles.breakpoints.s}) {
          body {
            font-size: ${styles.font.fontSize.m};
          }
        }
        input,
        textarea,
        button {
          letter-spacing: inherit;
          font-family: inherit;
          display: block;
          box-sizing: border-box;
          font-size: inherit;
          line-height: inherit;
          letter-spacing: inherit;
        }
      `}
    />
  )
}
export default GlobalStyles
