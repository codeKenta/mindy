import firebase from 'firebase'
import { storage, auth } from '../firebase'
import { useState, useEffect } from 'react'

const useStorage = () => {
  const [data, setData] = useState()
  const [fileData, setFileData] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [progress, setProgress] = useState(null)
  const [resultUrls, setResultUrls] = useState([])

  const clearData = () => {
    setData(null)
  }

  useEffect(() => {
    const initUploadToFirestore = () => {
      const storageRef = storage.ref()

      // Create the file metadata
      var metadata = {
        contentType: fileData.type,
      }

      // Upload file and metadata to the object 'images/mountains.jpg'
      var uploadTask = storageRef
        .child('images/' + fileData.name)
        .put(fileData, metadata)

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function(snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          setProgress(progress)
          console.log('Upload is ' + progress + '% done')
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused')
              if (isLoading) {
                setIsLoading(false)
              }
              break
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running')
              if (!isLoading) {
                setIsLoading(true)
              }
              break
          }
        },
        function(error) {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          setIsError(error)
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break

            case 'storage/canceled':
              // User canceled the upload
              break

            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break
          }
        },
        function() {
          // Upload completed successfully, now we can get the download URL

          setIsLoading(true)
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            setResultUrls(resultUrls.push(downloadURL))
            console.log('File available at', downloadURL)
          })
        }
      )
    }

    fileData && initUploadToFirestore()
  }, [fileData])

  // TODO:
  // Make funktion to upload array of files,
  // return a promise so we can use it before add the story to db with the uploaded inages firebase-url

  const uploadFiles = async files => {
    if (files.length > 0) {
      for (const file of files) {
        // const contents = await fs.readFile(file, 'utf8')
        /*
        
        */
        // console.log(contents)
      }
    }
  }

  return [{ data, isLoading, isError, progress }, setFileData, clearData]
}

export default useStorage
