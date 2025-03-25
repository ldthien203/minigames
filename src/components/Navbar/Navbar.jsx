import {Link, useNavigate} from 'react-router'
import React from 'react'
import './Navbar.css'
import useDropdown from '../../hooks/useDropDown'
import useAuth from '../../hooks/useAuth'

const Navbar = () => {
  const navigate = useNavigate()
  const {isOpen, toggleDropDown} = useDropdown()
  const [isMenuOpen, seIsMenuOpen] = React.useState(false)
  const {user, logout} = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/sign-in')
  }

  return (
    <nav className="navbar">
      <div className="menu-toggle" onClick={() => seIsMenuOpen(!isMenuOpen)}>
        ☰
      </div>
      <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <li>
          <Link to="/home" end>
            Home
          </Link>
        </li>
        <li>
          <Link to="/games" end>
            Games
          </Link>
        </li>
        <li>
          <Link to="/profile" end>
            Profile
          </Link>
        </li>
      </ul>
      <div className="user-section">
        <img
          src={require('../../assets/avatar.png')}
          alt="User avatar"
          className="avatar"
        />
        <div className="user-dropdown">
          <span className="username" onClick={toggleDropDown}>
            {user?.name || 'Guest'}
          </span>
          {isOpen && (
            <div className="dropdown">
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
