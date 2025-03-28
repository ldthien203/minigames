import {Link, useNavigate} from 'react-router'
import React from 'react'
import useDropdown from '../../hooks/useDropDown'
import useAuth from '../../hooks/useAuth'
import MainMenu from '../MainMenu/MainMenu'
import './Navbar.css'

const Navbar = () => {
  const navigate = useNavigate()
  const {isOpen, toggleDropDown} = useDropdown()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const {user, logout} = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/sign-in')
  }

  return (
    <div className="navbar">
      <Link to="/home" className="site-logo">
        <img src={require('../../assets/img/logo.png')} alt="Site Logo" />
      </Link>

      <nav className="top-nav-area">
        <MainMenu />
        <div className="user-panel">
          {user ? (
            <>
              <span className="username" onClick={toggleDropDown}>
                {user?.name || 'Guest'}
              </span>
              {isOpen && (
                <div className="dropdown">
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </>
          ) : (
            <>
              <Link to="/sign-in">Login</Link> /{' '}
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>
      <div className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        ☰
      </div>
    </div>
  )
}

export default Navbar
