import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { useTheme } from 'emotion-theming'

const CircleCheckLoader = ({ loading, size = '2em' }) => {
  const theme = useTheme()

  // https://codepen.io/Elifaz/pen/oQQXzr
  //

  const Circle = styled.div`
    &.circle-loader {
      border: 2px solid rgba(0, 0, 0, 0.2);
      border-left-color: ${theme.success};
      animation: loader-spin 1.2s infinite linear;
      position: relative;
      vertical-align: top;
      display: inline-block;
      border-radius: 50%;
      width: ${size};
      height: ${size};
      display: grid;
      grid: 1fr / 1fr;
      place-items: center;
      grid-column: 1;
      grid-row: 1;
    }

    &.load-complete {
      animation: none;
      border-color: ${theme.success};
      transition: border 500ms ease-out;
    }

    svg {
      .path {
        stroke-dasharray: 1000;
        stroke-dashoffset: 0;

        &.line {
          stroke-dashoffset: 1000;
          animation: dash 0.9s 0.35s ease-in-out forwards;
        }
        &.check {
          display: none;
          stroke-dashoffset: -100;
          animation: dash-check 0.9s 0.35s ease-in-out forwards;
          &.load-complete {
            display: unset;
          }
        }
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

    @keyframes dash-check {
      0% {
        stroke-dashoffset: -100;
      }
      100% {
        stroke-dashoffset: 900;
      }
    }

    @keyframes dash {
      0% {
        stroke-dashoffset: 1000;
      }
      100% {
        stroke-dashoffset: 0;
      }
    }
  `

  return (
    <Circle className={`circle-loader ${loading ? '' : 'load-complete'}`}>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 130.2 130.2"
      >
        <polyline
          className={`path check ${loading ? '' : 'load-complete'}`}
          fill="none"
          stroke={theme.success}
          strokeWidth="8"
          strokeLinecap="round"
          strokeMiterlimit="10"
          points="100.2,40.2 51.5,88.8 29.8,67.5 "
        />
      </svg>
    </Circle>
  )
}

CircleCheckLoader.propTypes = {
  loading: PropTypes.bool,
}

export default CircleCheckLoader
