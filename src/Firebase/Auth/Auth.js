import React from 'react'
import { auth, provider } from '../firebase'
import PropTypes from 'prop-types'
import { useContext } from 'react'

/*
Firebase method
*/

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
      user = auth.currentUser
    }
    return { initializing: !user, user }
  })

  function onChange(user) {
    setState({ initializing: false, user })
  }

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(onChange)
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
