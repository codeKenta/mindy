import React, { useEffect, useState, useMemo } from 'react'
import { useTheme } from 'emotion-theming'
import styled from '@emotion/styled'
import styles from '@styles/'
import { useDropzone } from 'react-dropzone'

const Text = styled.p`
  text-align: center;
`

const DropZoneContainerBase = styled.div`
  display: grid;
  padding: ${styles.space.s};
  place-items: center;
`
const DropZoneContainer = styled(DropZoneContainerBase)`
  border: 1px dashed ${props => props.theme.primary};
  cursor: pointer;
`

const DisabledDropZone = styled(DropZoneContainerBase)`
  border: 1px dashed ${props => props.theme.disabled};
  cursor: not-allowed;
`

const DropZone = ({ images, handleImages }) => {
  const theme = useTheme()
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      !isDragReject &&
        acceptedFiles.forEach(file => {
          file.preview = URL.createObjectURL(file)
          handleImages([...images, file])
        })
    },
  })

  const activeStyle = {
    borderColor: theme.secondary,
  }
  const acceptStyle = {
    borderColor: theme.success,
  }
  const rejectStyle = {
    borderColor: theme.error,
  }

  const style = useMemo(
    () => ({
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject]
  )

  const [reachedFilesLimit, setReachedFilesLimit] = useState(false)

  useEffect(() => {
    if (images.length === 3) {
      setReachedFilesLimit(true)
    }
    if (images.length < 3 && reachedFilesLimit) {
      setReachedFilesLimit(false)
    }
  }, [images])

  const renderContent = () => {
    if (reachedFilesLimit) {
      return (
        <DisabledDropZone theme={theme}>
          <Text>You reached the maximum number of files</Text>
        </DisabledDropZone>
      )
    } else {
      return (
        <DropZoneContainer theme={theme} {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <Text>Drag 'n' drop some files here, or click to select files</Text>
        </DropZoneContainer>
      )
    }
  }

  return renderContent()
}

export default DropZone
