import React from 'react'
import styled from '@emotion/styled'
import styles from '@styling'
import ContentLoader from 'react-content-loader'

const StyledItem = styled.div`
  background: black;
  padding: ${styles.space.m};
  margin-bottom: ${styles.space.m};
  margin-left: -${styles.space.m};
  margin-right: -${styles.space.m};
  @media (min-width: ${styles.breakpoints.s}) {
    padding: ${styles.space.l};
    margin-left: 0;
    margin-right: 0;
  }
`

const PlaceholderItem = () => (
  <StyledItem>
    <ContentLoader
      speed={2}
      width="100%"
      height={340}
      viewBox="0 0 100% 100%"
      backgroundColor="#606060"
      foregroundColor="#878787"
    >
      <rect x="20" y="20" rx="3" ry="3" width="200" height="6" />
      <rect x="20" y="40" rx="3" ry="3" width="240" height="6" />
      <rect x="20" y="60" rx="3" ry="3" width="180" height="6" />

      <rect x="20" y="100" rx="3" ry="3" width="70%" height="6" />
      <rect x="20" y="120" rx="3" ry="3" width="40%" height="6" />
      <rect x="20" y="140" rx="3" ry="3" width="80%" height="6" />
      <rect x="20" y="160" rx="3" ry="3" width="60%" height="6" />
      <rect x="20" y="180" rx="3" ry="3" width="50%" height="6" />
      <rect x="20" y="200" rx="3" ry="3" width="80%" height="6" />
      <rect x="20" y="220" rx="3" ry="3" width="70%" height="6" />
      <rect x="20" y="240" rx="3" ry="3" width="60%" height="6" />

      <rect x="20" y="260" rx="3" ry="3" width="50%" height="6" />
      <rect x="20" y="280" rx="3" ry="3" width="80%" height="6" />
      <rect x="20" y="300" rx="3" ry="3" width="70%" height="6" />
      <rect x="20" y="320" rx="3" ry="3" width="60%" height="6" />
    </ContentLoader>
  </StyledItem>
)

const PlaceholderFeed = () => (
  <>
    <PlaceholderItem />
    <PlaceholderItem />
  </>
)

export default PlaceholderFeed
