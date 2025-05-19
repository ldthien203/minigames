import {Link} from 'react-router'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faYoutube,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons'
import './IconLink.css'

const IconLink = ({showText = true, text = 'Follow us:', align = 'right'}) => {
  return (
    <div className={`social-icon ${align}`}>
      {showText && <p>{text}</p>}
      <Link className="icon" to="#">
        <FontAwesomeIcon icon={faFacebook} />
      </Link>
      <Link className="icon" to="#">
        <FontAwesomeIcon icon={faTwitter} />
      </Link>
      <Link className="icon" to="#">
        <FontAwesomeIcon icon={faInstagram} />
      </Link>
      <Link className="icon" to="#">
        <FontAwesomeIcon icon={faYoutube} />
      </Link>
      <Link className="icon" to="#">
        <FontAwesomeIcon icon={faLinkedin} />
      </Link>
    </div>
  )
}

export default IconLink
