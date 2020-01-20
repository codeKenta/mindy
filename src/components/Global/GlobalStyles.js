/** @jsx jsx */
import { css, Global } from "@emotion/core"
import { jsx } from "theme-ui"

require("typeface-nunito")

const GlobalStyles = () => (
  <Global
    styles={css`
      body {
        margin: 0;
        font-family: "Nunito", sans-serif;
      }
    `}
  />
)

export default GlobalStyles
