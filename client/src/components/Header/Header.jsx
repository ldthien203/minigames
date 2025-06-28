import Navbar from '../Navbar/Navbar'
import '../../App.css'
import {Fragment} from 'react'
import IconLink from '../IconLink/IconLink'
import './Header.css'

const Header = () => {
  return (
    <Fragment>
      <div id="preloder">
        <div className="loader"></div>
      </div>

      <header className="header-section">
        <div className="header-wrap">
          <IconLink showTest={true} />
          <Navbar />
        </div>
      </header>
    </Fragment>
  )
}

export default Header
