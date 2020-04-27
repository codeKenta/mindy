import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const CircleCheckLoader = ({ isLoading = true, done = false }) => {
  const [loading, setLoading] = useState(isLoading)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLoading(false)
    }, 1000)
    return () => clearInterval(intervalId)
  }, [])

  const brandSuccess = '#5cb85c'

  const unit = 'em'

  const loaderSizeValue = 3
  const loaderSize = `${loaderSizeValue}${unit}`

  const checkHeightValue = loaderSizeValue / 2
  const checkHeight = `${checkHeightValue}${unit}`

  const checkWidthValue = checkHeightValue / 3
  const checkWidth = `${checkWidthValue}${unit}`

  const checkLeftValue = loaderSizeValue / 10 + loaderSizeValue / 12
  const checkLeft = `${checkLeftValue}${unit}`

  const checkThickness = '3px'
  const checkColor = brandSuccess

  const Loader = styled.div`
    &.circle-loader {
      margin-bottom: ${loaderSize} / 2;
      border: 2px solid rgba(0, 0, 0, 0.2);
      border-left-color: ${checkColor};
      animation: loader-spin 1.2s infinite linear;
      position: relative;
      vertical-align: top;
      display: inline-block;
      border-radius: 50%;
      width: ${loaderSize};
      height: ${loaderSize};
    }

    &.load-complete {
      animation: none;
      border-color: ${checkColor};
      transition: border 500ms ease-out;
      .checkmark {
        display: block;
      }
    }

    .checkmark {
      display: none;

      &.draw:after {
        animation-duration: 800ms;
        animation-timing-function: ease;
        animation-name: checkmark;
        transform: scaleX(-1) rotate(135deg);
      }

      &:after {
        opacity: 1;
        height: ${checkHeight};
        width: ${checkWidth};
        transform-origin: left top;
        border-right: ${checkThickness} solid ${checkColor};
        border-top: ${checkThickness} solid ${checkColor};
        content: '';
        left: ${checkLeft};
        top: ${checkHeight};
        position: absolute;
      }
    }

    @keyframes loader-spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    @keyframes checkmark {
      0% {
        height: 0;
        width: 0;
        opacity: 1;
      }
      20% {
        height: 0;
        width: ${checkWidth};
        opacity: 1;
      }
      40% {
        height: ${checkHeight};
        width: ${checkWidth};
        opacity: 1;
      }
      100% {
        height: ${checkHeight};
        width: ${checkWidth};
        opacity: 1;
      }
    }
  `

  return (
    <Loader className={`circle-loader ${loading ? '' : 'load-complete'}`}>
      <div className="checkmark draw"></div>
    </Loader>
  )
}

CircleCheckLoader.propTypes = {
  loading: PropTypes.bool,
}

export default CircleCheckLoader
