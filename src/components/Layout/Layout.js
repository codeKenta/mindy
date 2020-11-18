import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery } from 'gatsby'
import Navbar from '../DocumentStructure/Navbar'
import Footer from '../DocumentStructure/Footer'
import PageContent from '../DocumentStructure/PageContent'
import styled from '@emotion/styled'
// import styles from '@styling'

import BackgroundImage from 'gatsby-background-image'
import { useSession } from '../../Firebase/Auth/Auth'

const LayoutWrapper = styled.div`
  display: grid;
  height: 100vh;
`

const StyledBackgroundImage = styled(BackgroundImage)`
  background-size: cover;
  height: 100vh;
  width: 100%;
`

const Layout = ({ background, children }) => {
  const {
    hero: { heroimage },
  } = useStaticQuery(graphql`
    {
      hero: datoCmsLandingPage {
        heroimage {
          fluid {
            ...GatsbyDatoCmsFluid
          }
        }
      }
    }
  `)

  const user = useSession()

  return (
    <LayoutWrapper>
      {user ? (
        <>
          <Navbar />
          <PageContent as="main">{children}</PageContent>
          <Footer />
        </>
      ) : (
        <StyledBackgroundImage Tag="div" fluid={heroimage.fluid}>
          <main>{children}</main>
        </StyledBackgroundImage>
      )}
    </LayoutWrapper>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  background: PropTypes.string,
}

export default Layout
