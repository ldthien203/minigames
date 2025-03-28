import {Link} from 'react-router'
import './MainMenu.css'

const MainMenu = ({showSubMenu = true}) => {
  return (
    <ul className="main-menu">
      <li className="show-arrow">
        <Link to="/home">Home</Link>
      </li>
      <li className="has-submenu show-arrow">
        <Link to="/games">Games</Link>
        {showSubMenu && (
          <ul className="sub-menu">
            <li>
              <Link to="/game-single">Game Single</Link>
            </li>
          </ul>
        )}
      </li>
      <li className="show-arrow">
        <Link to="/reviews">Reviews</Link>
      </li>
      <li className="show-arrow">
        <Link to="/news">News</Link>
      </li>
      <li className="show-arrow">
        <Link to="/contact">Contact</Link>
      </li>
    </ul>
  )
}

export default MainMenu
