import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import styles, { helpers } from '../../Styles'

const StyledPageContent = styled.div`
  width: 100%;
  padding: ${styles.space.xl} 0;
  place-self: center;
  ${helpers.placeContentInLayout}
`

const PageContent = ({ children }) => {
  return <StyledPageContent>{children}</StyledPageContent>
}

PageContent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default PageContent
