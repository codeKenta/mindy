import React from 'react'
import PropTypes from 'prop-types'
import Navbar from '../DocumentStructure/Navbar'
import Footer from '../DocumentStructure/Footer'
import PageContent from '../DocumentStructure/PageContent'
import styled from '@emotion/styled'
import { helpers } from '../../Styles'

const LayoutWrapper = styled.div`
  display: grid;
  min-height: 100vh;
  ${props => `background: ${props.background}`};
`
/* grid-template-rows: [main-start] 70px [content-start] max-content [footer-start] max-content [main-end]; */
/* ${helpers.useGlobalLayout}; */

const Layout = ({ background, children }) => {
  return (
    <LayoutWrapper background={background}>
      <Navbar />
      <PageContent as="main">{children}</PageContent>
      <Footer />
    </LayoutWrapper>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  background: PropTypes.string,
}

export default Layout
