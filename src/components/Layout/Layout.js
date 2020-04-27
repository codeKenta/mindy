import React from 'react'
import PropTypes from 'prop-types'
import Navbar from '../DocumentStructure/Navbar'
import Footer from '../DocumentStructure/Footer'
import PageContent from '../DocumentStructure/PageContent'
import styled from '@emotion/styled'
import { helpers } from '../../Styles'
import Modal from '../Modals/Modal'

const LayoutWrapper = styled.div`
  display: grid;
  min-height: 100vh;
  ${helpers.useGlobalLayout};
  grid-template-rows: [main-start] 70px [content-start] max-content [footer-start] max-content [main-end];
  ${props => `background: ${props.background}`};
`

const Layout = ({ background, children }) => {
  return (
    <LayoutWrapper background={background}>
      <Modal />
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
