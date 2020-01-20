import React from "react"
import { useStitchAuth } from "../../Auth/StitchAuth"

const Footer = () => {
  const {
    isLoggedIn,
    actions: { handleLogout },
  } = useStitchAuth()

  return (
    <footer>
      <span>Mindy</span>
      {isLoggedIn && <button onClick={handleLogout}>Log out</button>}
    </footer>
  )
}

export default Footer
