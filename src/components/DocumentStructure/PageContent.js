import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import styles, { helpers } from '@styling'

const StyledPageContent = styled.div`
  width: 100%;
  max-width: ${styles.contentMaxWidth};
  margin: 0 auto;
  padding-top: ${styles.space.xl};
  padding-bottom: ${styles.space.xl};
  ${helpers.contentWrapperPaddingX}
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
