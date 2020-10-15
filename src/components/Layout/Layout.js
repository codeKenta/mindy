import React from 'react'
import PropTypes from 'prop-types'
import Navbar from '../DocumentStructure/Navbar'
import Footer from '../DocumentStructure/Footer'
import PageContent from '../DocumentStructure/PageContent'
import styled from '@emotion/styled'

const LayoutWrapper = styled.div`
  display: grid;
  min-height: 100vh;
  ${props => `background: ${props.background}`};
`

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
