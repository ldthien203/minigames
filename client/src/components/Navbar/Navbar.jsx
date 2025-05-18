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
  const {user, loading, logout} = useAuth()

  return (
    <div className="navbar">
      <Link to="/" className="site-logo">
        <img src="/assets/img/logo.png" alt="Site Logo" />
      </Link>

      <nav className="top-nav-area">
        <div className={`main-menu-container ${isMenuOpen ? 'show-menu' : ''}`}>
          <MainMenu />
        </div>
        <div className="user-panel">
          {loading ? (
            <p>Loading</p>
          ) : user ? (
            <>
              <span className="username" onClick={toggleDropDown}>
                {user?.username || 'Guest'}
              </span>
              {isOpen && (
                <div className="drop-down">
                  <button onClick={() => navigate('/profile')}>Profile</button>
                  <button onClick={logout}>Logout</button>
                </div>
              )}
            </>
          ) : (
            <>
              <Link to="/sign-in" className="sign-in">
                Login
              </Link>{' '}
              /{' '}
              <Link to="/register" className="register">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>

      <div className="menu-toggle-container">
        <button
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
        <div
          className={`mobile-menu ${isMenuOpen ? 'show-menu' : ''}`}
          onMouseLeave={() => setIsMenuOpen(false)}
        >
          <MainMenu />
        </div>
      </div>
    </div>
  )
}

export default Navbar
