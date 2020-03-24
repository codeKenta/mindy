import React from 'react'
import { useAuth } from '../Auth'

function Login() {
  const { signInWithGoogle, signInAnonymously } = useAuth()

  return (
    <div>
      <button onClick={signInWithGoogle}>Login with Google</button>
      <button onClick={signInAnonymously}>Sign in anonymously</button>
    </div>
  )
}

export default Login
