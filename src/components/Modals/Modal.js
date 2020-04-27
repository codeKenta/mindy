import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useTheme } from 'emotion-theming'

import styled from '@emotion/styled'
import styles from '../../Styles'

import { useExperiences } from '../../hooks/useExperiences'
import { css } from '@emotion/core'
import GridLoader from 'react-spinners/GridLoader'

const Modal = props => {
  const theme = useTheme()

  const { statusNames, status, statusMessage } = useExperiences()

  const isLoading = status == statusNames.fetching

  useEffect(() => {
    console.log('MODAL', { status, statusMessage, isLoading })
  }, [statusNames, status, statusMessage, isLoading])

  const ModalOverlay = styled.div`
    position: fixed;
    z-index: 1000;
    width: 100%;
    top: 40px;
    /* top: 0;
    bottom: 0;
    left: 0;
    right: 0; */
    padding: 50px;
    background: rgba(40, 40, 40, 0.4);
  `

  const ModalBox = styled.div`
    background: ${theme.fieldBackground};
    padding: ${styles.space.m};
  `

  return (
    <ModalOverlay>
      <ModalBox>
        <h3>MODAL</h3>
        <p>{statusMessage}</p>
        <GridLoader
          //   css={override}
          size={150}
          color={theme.primary}
          loading={isLoading}
        />
      </ModalBox>
    </ModalOverlay>
  )
}

Modal.propTypes = {}

export default Modal
