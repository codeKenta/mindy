import React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'
import styles, { helpers } from '../../Styles'
import { useTheme } from 'emotion-theming'

const { space, contentMaxWidth, gridLines } = styles

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
  const theme = useTheme()

  const StyledNavbar = styled.nav`
  background: ${theme.nav};
  display: grid;
  ${helpers.useGlobalLayout}
  grid-column: ${gridLines.column.mainStart} /
    ${gridLines.column.mainEnd};
  grid-row: main-start / content-start;
`

  return (
    <StyledNavbar>
      <ContentWrapper>
        <span>Mindy</span>

        <Menu>
          <Link to="/">Your stories</Link>
          <Link to="/new-story">New story</Link>
        </Menu>
      </ContentWrapper>
    </StyledNavbar>
  )
}

export default Navbar
