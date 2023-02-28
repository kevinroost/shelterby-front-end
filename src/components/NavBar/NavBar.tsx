// npm modules
import { NavLink } from 'react-router-dom'

// types
import { User } from '../../types/models'

import './NavBar.css'

interface NavBarProps {
  user: User | null;
  handleLogout: () => void;
}

const NavBar = (props: NavBarProps): JSX.Element => {
  const { user, handleLogout } = props
  
  return (
    <nav>
      {user ?
        <ul>
          <li id='dogs'><NavLink to="/dogs">See The Dogs!</NavLink></li>
          <li id='family'><NavLink to="/myProfile">My Family</NavLink></li>
          <li id='logout'><NavLink to="" onClick={handleLogout}>LOG OUT</NavLink></li>
        </ul>
      :
        <ul>
          <li><NavLink to="/dogs">See The Dogs!</NavLink></li>
          <li id='in-out'><NavLink to="">Log In/Sign Up</NavLink></li>
        </ul>
      }
    </nav>
  )
}

export default NavBar
