import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useTheme } from 'emotion-theming'

import styled from '@emotion/styled'
import styles from '../../Styles'

import { useExperiences } from '../../hooks/useExperiences'
import { css } from '@emotion/core'
import GridLoader from 'react-spinners/GridLoader'

const FeedbackFlash = props => {
  const theme = useTheme()

  const { statusNames, status, statusMessage } = useExperiences()

  const isLoading = status == statusNames.fetching

  useEffect(() => {
    console.log('FEEDBACK', { status, statusMessage, isLoading })
  }, [statusNames, status, statusMessage, isLoading])

  const ModalOverlay = styled.div`
    /* top: 0;
    bottom: 0;
    left: 0;
    right: 0; */
    padding: 50px;
    background: rgba(40, 40, 40, 0.4);
  `

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
      <p>{statusMessage}</p>
      <GridLoader
        //   css={override}
        size={150}
        color={theme.primary}
        loading={isLoading}
      />
    </FeedbackContainer>
  )
}

FeedbackFlash.propTypes = {}

export default FeedbackFlash
