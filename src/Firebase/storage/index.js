// import firebase from 'firebase'
import { storage } from '../firebase'
import { useState } from 'react'
let firebase

if (typeof window !== 'undefined') {
  firebase = require('firebase')
}

const useStorage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [progress, setProgress] = useState(null)

  const uploadToFirebase = file => {
    return new Promise(function(resolve, reject) {
      const storageRef = storage.ref()

      // Create the file metadata
      var metadata = {
        contentType: file.type,
      }

      // Upload file and metadata to the object 'images/mountains.jpg'
      var uploadTask = storageRef
        .child('images/' + file.name)
        .put(file, metadata)

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function(snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          setProgress(progress)
          // console.log('Upload is ' + progress + '% done')
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              if (isLoading) {
                setIsLoading(false)
              }
              break
            case firebase.storage.TaskState.RUNNING: // or 'running'
              if (!isLoading) {
                setIsLoading(true)
              }
              break
          }
        },
        function(error) {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          throw error

          // switch (error.code) {
          //   case 'storage/unauthorized':
          //     // User doesn't have permission to access the object
          //     break

          //   case 'storage/canceled':
          //     // User canceled the upload
          //     break

          //   case 'storage/unknown':
          //     // Unknown error occurred, inspect error.serverResponse
          //     break
          // }
        },
        function() {
          // Upload completed successfully, now we can get the download URL
          setIsLoading(false)
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            resolve(downloadURL)
          })
        }
      )
    })
  }

  const uploadFiles = async files => {
    let urls = []
    for (const file of files) {
      if (!isError) {
        // If the post is being edited and it already has file/files uploaded.
        if (typeof file === 'string') {
          urls.push(file)
        } else {
          try {
            const url = await uploadToFirebase(file)
            await urls.push(url)
          } catch (error) {
            setIsError(error)
          }
        }
      }
    }
    return await urls
  }

  return [{ isLoading, isError, progress }, uploadFiles]
}

export default useStorage
