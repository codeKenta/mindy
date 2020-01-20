/** @jsx jsx */
import { jsx } from "theme-ui"

const Navbar = () => {
  return (
    <nav
      sx={{
        padding: 4,
        color: "text",
        backgroundColor: "nav",
      }}
    >
      <span>Mindy</span>

      <ul>
        <li>link 1</li>
        <li>link 2</li>
      </ul>
    </nav>
  )
}

export default Navbar
