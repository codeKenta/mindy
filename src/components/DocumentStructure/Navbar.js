import React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'
import styles, { helpers } from '../../Styles'

const { space, contentMaxWidth, gridLines } = styles

const StyledNavbar = styled.nav`
  background: darkslateblue;
  display: grid;
  ${helpers.useGlobalLayout}
  grid-column: ${gridLines.column.mainStart} /
    ${gridLines.column.mainEnd};
  grid-row: main-start / content-start;
`

const Menu = styled.ul`
  padding: 0;
  a {
    color: white;
    text-decoration: none;
    margin-left: ${space.s};
  }
`

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  ${helpers.placeContentInLayout}
`
const Navbar = () => {
  return (
    <StyledNavbar>
      <ContentWrapper>
        <span>Mindy</span>

        <Menu>
          <Link to="/">Your stories</Link>
          <Link to="/story">New story</Link>
        </Menu>
      </ContentWrapper>
    </StyledNavbar>
  )
}

export default Navbar
