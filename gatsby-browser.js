import React from 'react'
import PropTypes from 'prop-types'
import GlobalStyles from './src/components/Global/GlobalStyles'
import { ExperiencesProvider } from './src/hooks/useExperiences'
import { ThemeProvider } from 'emotion-theming'
import { AuthProvider } from './src/Firebase/Auth/Auth'
import { themes } from './src/Styles'

import {
  ThemeProvider as MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles'

const theme = themes.dark

const muiTheme = createMuiTheme({
  palette: {
    primary: { main: theme.primary },
    secondary: { main: theme.secondary },
  },
})

console.log({ theme, muiTheme })
export const wrapPageElement = ({ element, props: { location } }) => {
  return (
    // <Auth pathname={location.pathname}>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <MuiThemeProvider theme={muiTheme}>
          <GlobalStyles />
          <ExperiencesProvider>{element}</ExperiencesProvider>
        </MuiThemeProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}

wrapPageElement.propTypes = {
  element: PropTypes.element.isRequired,
  props: PropTypes.object.isRequired,
}
