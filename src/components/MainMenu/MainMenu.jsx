import {useState} from 'react'
import {Link} from 'react-router'
import './MainMenu.css'

const MainMenu = () => {
  const [activeMenu, setActiveMenu] = useState(null)

  const mainMenuList = [
    {id: 'home', link: '/home', menu: 'Home'},
    {
      id: 'games',
      link: '/games',
      menu: 'Games',
      subMenu: [
        {id: 'caro', link: '/games/caro', menu: 'Caro'},
        {id: 'chess', link: '#', menu: 'Chess'},
      ],
    },

    {id: 'reviews', link: '/reviews', menu: 'Reviews'},
    {id: 'news', link: '/news', menu: 'News'},
    {id: 'contact', link: '/contact', menu: 'Contact'},
  ]

  return (
    <ul className="main-menu">
      {mainMenuList.map(el => (
        <li
          key={el.id}
          className="main-list show-arrow"
          onMouseEnter={() => el.subMenu && setActiveMenu(el.id)}
          onMouseLeave={() => setActiveMenu(false)}
        >
          <Link to={el.link}>{el.menu}</Link>
          {el.subMenu && activeMenu === el.id && (
            <ul className="sub-menu">
              {el.subMenu.map(sub => (
                <li key={sub.id} className="sub-list">
                  <Link to={sub.link}>{sub.menu}</Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  )
}

export default MainMenu
