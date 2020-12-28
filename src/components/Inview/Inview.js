import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useInView } from 'react-intersection-observer'
import throttle from 'lodash.throttle'

import styled from '@emotion/styled'

const Inview = ({ triggerFunction }) => {
  const { ref, inView } = useInView({
    threshold: 0,
  })

  const StyledInview = styled.div`
    visibility: 'hidden';
  `

  useEffect(() => {
    if (inView) {
      console.log('INVIEW EFFECT is in view')

      const throttledGetExperiences = throttle(triggerFunction, 500000, {
        trailing: false,
      })

      throttledGetExperiences()

      inView && triggerFunction()
    }
  }, [inView, triggerFunction])

  return <StyledInview ref={ref}></StyledInview>
}

Inview.propTypes = {
  triggerFunction: PropTypes.func.isRequired,
}

export default Inview
