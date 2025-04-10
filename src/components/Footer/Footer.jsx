// import './Footer.css'
import {Link} from 'react-router'
import MainMenu from '../MainMenu/MainMenu'
import IconLink from '../IconLink/IconLink'
import './Footer.css'
import footerLeftPic from '../../assets/img/footer-left-pic.png'
import footerRightPic from '../../assets/img/footer-right-pic.png'
import logo from '../../assets/img/logo.png'

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-left-pic">
          <img src={footerLeftPic} alt="footer left pic" />
        </div>
        <div className="footer-right-pic">
          <img src={footerRightPic} alt="footer right pic" />
        </div>
        <Link to="/" className="footer-logo">
          <img src={logo} alt="logo" />
        </Link>
        <MainMenu showSubMenu={false} />
        <IconLink showTest={false} align="center" />
        <div className="copyright">
          <p> Ldthien203 {new Date().getFullYear()} @ All rights reserved </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
