import React from 'react'
import { useSession, useAuth } from '../../Firebase/Auth/Auth'
import styled from '@emotion/styled'
import styles, { helpers } from '../../Styles'

const StyledFooter = styled.footer`
  background: darkslateblue;
  display: grid;
  ${helpers.useGlobalLayout}
  grid-column: ${styles.gridLines.column.mainStart} /
    ${styles.gridLines.column.mainEnd};
  grid-row: footer-start / -1;
`

const ContentWrapper = styled.div`
  width: 100%;
  ${helpers.placeContentInLayout}
`
const Footer = () => {
  const user = useSession()
  const { signOut } = useAuth()

  return (
    <StyledFooter>
      <ContentWrapper>
        <span>Mindy</span>
        {user && <button onClick={signOut}>Log out</button>}
      </ContentWrapper>
    </StyledFooter>
  )
}

export default Footer
