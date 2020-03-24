import React from 'react'
import PropTypes from 'prop-types'
import GlobalStyles from './src/components/Global/GlobalStyles'
import { ThemeProvider } from 'emotion-theming'
import { AuthProvider } from './src/Auth/Auth'
import { themes } from './src/Styles'

const theme = themes.dark

export const wrapPageElement = ({ element, props: { location } }) => {
  return (
    // <Auth pathname={location.pathname}>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {/* <ExperiencesProvider>{element}</ExperiencesProvider> */}
        {element}
      </ThemeProvider>
    </AuthProvider>
  )
}

wrapPageElement.propTypes = {
  element: PropTypes.element.isRequired,
  props: PropTypes.object.isRequired,
}
