import {Link} from 'react-router'
import MainMenu from '../MainMenu/MainMenu'
import IconLink from '../IconLink/IconLink'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-left-pic">
          <img src="/assets/img/footer-left-pic.png" alt="footer left pic" />
        </div>
        <div className="footer-right-pic">
          <img src="/assets/img/footer-right-pic.png" alt="footer right pic" />
        </div>
        <Link to="/" className="footer-logo">
          <img src={'/assets/img/logo.png'} alt="logo" />
        </Link>
        <MainMenu showSubMenu={false} />
        <IconLink showText={false} align="center" />
        <div className="copyright">
          <p> Ldthien203 {new Date().getFullYear()} @ All rights reserved </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
