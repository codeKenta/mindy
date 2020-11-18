import React from 'react'
import { useStaticQuery } from 'gatsby'
import styled from '@emotion/styled'
import { useAuth } from '../../Firebase/Auth/Auth'

import google from '@components/Icons/GoogleIcon/google-icon.svg'
import fawkes from '@components/Icons/Anonymous/guy-fawkes-mask.svg'
import LoginButton from '@components/LoginButton/LoginButton'

const LoginSection = styled.div`
  top: 20vh;
  position: fixed;
  width: 100%;
`

const InnerWrapper = styled.div`
  text-align: center;
  margin: 0 auto;
  max-width: 400px;
`

const ButtonWrapper = styled.div`
  margin-bottom: 20px;
`

const BrandText = styled.h1`
  font-family: 'Kufam';
  font-size: 50px;
  color: white;
`

const SloganText = styled.p`
  font-size: 18px;
  color: white;
  margin-bottom: 20px;
`

const Landing = () => {
  const {
    hero: { heroTitle, heroSlogan },
  } = useStaticQuery(graphql`
    {
      hero: datoCmsLandingPage {
        heroTitle
        heroSlogan
      }
    }
  `)

  const { signInWithGoogle, signInAnonymously } = useAuth()

  return (
    <LoginSection>
      <InnerWrapper>
        <BrandText>{heroTitle}</BrandText>
        <SloganText>{heroSlogan}</SloganText>

        <ButtonWrapper>
          <LoginButton
            clickHandler={signInWithGoogle}
            icon={google}
            text="Sign in with Google"
          />
        </ButtonWrapper>
        <ButtonWrapper>
          <LoginButton
            clickHandler={signInAnonymously}
            icon={fawkes}
            text="Sign in Anonymously"
          />
        </ButtonWrapper>
      </InnerWrapper>
    </LoginSection>
  )
}

export default Landing
