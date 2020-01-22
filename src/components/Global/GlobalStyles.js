import React from "react"
import { css, Global } from "@emotion/core"
import styles from "../../Styles"
import { useTheme } from "emotion-theming"

const GlobalStyles = () => {
  const theme = useTheme()
  console.log("GLOBAL STYLE,", theme)
  return (
    <Global
      styles={css`
        body {
          margin: 0;
          font-family: ${styles.fonts.body};
          background: ${theme.background};
          color: ${theme.text};
        }
      `}
    />
  )
}
export default GlobalStyles
