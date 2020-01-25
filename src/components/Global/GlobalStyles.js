import React from "react"
import { css, Global } from "@emotion/core"
import styles from "../../Styles"
import { useTheme } from "emotion-theming"

const GlobalStyles = () => {
  const theme = useTheme()
  return (
    <Global
      styles={css`
        body {
          margin: 0;
          font-family: ${styles.font.fontFamily.body};
          background: ${theme.background};
          color: ${theme.text};
          line-height: ${styles.font.lineHeights.body};
          letter-spacing: 0.1rem;
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
