import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import { firebaseConfig } from './config'

let auth, provider, db, storage

if (typeof window !== 'undefined') {
  firebase.initializeApp(firebaseConfig)
  auth = firebase.auth()
  auth.useDeviceLanguage()
  provider = new firebase.auth.GoogleAuthProvider()
  db = firebase.firestore()
  storage = firebase.storage()
}

export default firebase
export { auth, provider, db, storage }
