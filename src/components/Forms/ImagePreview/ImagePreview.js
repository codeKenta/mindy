import React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from 'emotion-theming'
import styled from '@emotion/styled'
import styles from '@styles/'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'

ImagePreview.propTypes = {
  images: PropTypes.array,
}

const PreviewContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr minmax(300px, 500px) 1fr;
  grid-template-areas: '. inner-grid .';
`

const InnerGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: ${styles.space.m};
  grid-area: inner-grid;
  grid-template-areas:
    'a b'
    'a c';
`
const ImageWrapperStyles = `
position: relative;
display: grid;
place-items: center;
`

const FeaturedImageWrapper = styled.div`
  ${ImageWrapperStyles}
  ${props =>
    props.hasImage ? '' : `border: 1px solid ${props.theme.primary}`};
  grid-area: a;
`

const SecondImageWrapper = styled.div`
  ${ImageWrapperStyles}
  ${props =>
    props.hasImage ? '' : `border: 1px solid ${props.theme.primary}`};
  grid-area: b;
`

const ThirdImageWrapper = styled.div`
  ${ImageWrapperStyles}
  ${props =>
    props.hasImage ? '' : `border: 1px solid ${props.theme.primary}`};
  grid-area: c;
`
const Image = styled.img`
  position: absolute;
  height: 100%;
  width: 100%;
  object-fit: cover;
`

function ImagePreview({ images }) {
  const getSourceFromIndex = index => {
    return typeof images[index] === 'string'
      ? images[index]
      : images[index].preview
  }
  const theme = useTheme()
  return (
    <PreviewContainer>
      <InnerGrid>
        <FeaturedImageWrapper hasImage={images.length >= 1} theme={theme}>
          {images.length >= 1 ? (
            <Image src={getSourceFromIndex(0)} />
          ) : (
            <FontAwesomeIcon size="3x" color={theme.primary} icon={faImage} />
          )}
        </FeaturedImageWrapper>
        <SecondImageWrapper hasImage={images.length >= 2} theme={theme}>
          {images.length >= 2 ? (
            <Image src={getSourceFromIndex(1)} />
          ) : (
            <FontAwesomeIcon size="2x" color={theme.primary} icon={faImage} />
          )}
        </SecondImageWrapper>
        <ThirdImageWrapper hasImage={images.length === 3} theme={theme}>
          {images.length === 3 ? (
            <Image src={getSourceFromIndex(2)} />
          ) : (
            <FontAwesomeIcon size="2x" color={theme.primary} icon={faImage} />
          )}
        </ThirdImageWrapper>
      </InnerGrid>
    </PreviewContainer>
  )
}

export default ImagePreview
