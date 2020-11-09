import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useInView } from 'react-intersection-observer'
import styled from '@emotion/styled'

const Inview = ({ triggerFunction }) => {
  const { ref, inView, entry } = useInView({
    threshold: 0,
  })

  const StyledInview = styled.div`
    visibility: 'hidden';
  `

  useEffect(() => {
    inView && triggerFunction()
  }, [inView])

  return <StyledInview ref={ref}></StyledInview>
}

Inview.propTypes = {
  triggerFunction: PropTypes.func.isRequired,
}

export default Inview
