import React from 'react'
import styled from '@emotion/styled'
import styles, { helpers } from '../../Styles'

const StyledNavbar = styled.nav`
  background: darkslateblue;
  display: grid;
  ${helpers.useGlobalLayout}
  grid-column: ${styles.gridLines.column.mainStart} /
    ${styles.gridLines.column.mainEnd};
  grid-row: main-start / content-start;
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

        <ul>
          <li>link 1</li>
          <li>link 2</li>
        </ul>
      </ContentWrapper>
    </StyledNavbar>
  )
}

export default Navbar
