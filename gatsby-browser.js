import React from 'react'
import PropTypes from 'prop-types'
import GlobalStyles from './src/components/Global/GlobalStyles'
import { ExperiencesProvider } from './src/hooks/useExperiences'
import { ThemeProvider } from 'emotion-theming'
import { AuthProvider } from './src/Firebase/Auth/Auth'
import { themes } from './src/Styles'

const theme = themes.dark

export const wrapPageElement = ({ element, props: { location } }) => {
  return (
    // <Auth pathname={location.pathname}>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <ExperiencesProvider>{element}</ExperiencesProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}

wrapPageElement.propTypes = {
  element: PropTypes.element.isRequired,
  props: PropTypes.object.isRequired,
}
