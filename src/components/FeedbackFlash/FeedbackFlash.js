import React, { useEffect } from 'react'
import { useTheme } from 'emotion-theming'

import styled from '@emotion/styled'
import styles from '@styles'

import { useExperiences } from '../../hooks/useExperiences'
import CircleCheckLoader from '../Loaders/CircleCheckLoader'

const FeedbackFlash = props => {
  const theme = useTheme()

  const { statusNames, status, statusMessage, isLoading } = useExperiences()

  const FeedbackContainer = styled.div`
    position: fixed;
    z-index: 1000;
    width: 100%;
    top: ${styles.space.m};
    background: ${theme.fieldBackground};
    padding: ${styles.space.m};
    text-align: center;
  `

  return (
    <FeedbackContainer>
      <h3>Feedback</h3>
      <span>{statusMessage}</span>
      <CircleCheckLoader loading={isLoading} />
    </FeedbackContainer>
  )
}

FeedbackFlash.propTypes = {}

export default FeedbackFlash
