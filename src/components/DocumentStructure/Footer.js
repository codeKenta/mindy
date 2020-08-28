import React from 'react'
import { useSession, useAuth } from '../../Firebase/Auth/Auth'
import styled from '@emotion/styled'
import styles, { helpers } from '../../Styles'

const StyledFooter = styled.footer`
  background: darkslateblue;
  ${helpers.contentWrapperPaddingX}
`

const ContentWrapper = styled.div`
  width: 100%;
  max-width: ${styles.contentMaxWidth};
  margin: 0 auto;
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
