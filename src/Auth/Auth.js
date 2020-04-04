import React from 'react'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import PropTypes from 'prop-types'
import { useContext } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { firebaseConfig } from './config'

/*

Firebase methods

*/
let auth, provider, db
if (typeof window !== 'undefined') {
  firebase.initializeApp(firebaseConfig)
  auth = firebase.auth()
  auth.useDeviceLanguage()
  provider = new firebase.auth.GoogleAuthProvider()
  // db = firebase.firestore
}

// export const firebase

export { firebase }

const signInWithGoogle = async () => {
  try {
    await auth.signInWithPopup(provider)
  } catch (err) {
    console.error(err)
    throw err
  }
}

const signInWithEmail = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password)
  } catch (err) {
    console.error(err)
    throw err
  }
}

const createUserWithEmail = async (email, password) => {
  try {
    await auth.createUserWithEmailAndPassword(email, password)
  } catch (err) {
    console.error(err)
    throw err
  }
}

const signInAnonymously = async () => {
  try {
    await auth.signInAnonymously()
  } catch (err) {
    console.error(err)
    throw err
  }
}

const signOut = () => auth.signOut()

/*

Hooks and context

*/

const userContext = React.createContext({
  user: null,
})

export const useSession = () => {
  const { user } = useContext(userContext)
  return user
}

export const AuthProvider = ({ children }) => {
  const { state } = useAuth()
  const { initialising, user } = state

  return (
    <userContext.Provider
      value={{
        user: user,
        initialising,
      }}
    >
      {children}
    </userContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export const useAuth = () => {
  const [state, setState] = React.useState(() => {
    let user
    if (typeof window !== 'undefined') {
      user = firebase.auth().currentUser
    }
    return { initializing: !user, user }
  })

  function onChange(user) {
    setState({ initializing: false, user })
  }

  React.useEffect(() => {
    // listen for auth state changes
    const unsubscribe = firebase.auth().onAuthStateChanged(onChange)
    // unsubscribe to the listener when unmounting
    return () => unsubscribe()
  }, [])

  return {
    state,
    signInWithGoogle,
    signInWithEmail,
    createUserWithEmail,
    signInAnonymously,
    signOut,
  }
}
