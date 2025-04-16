import {Link} from 'react-router'
import './IconLink.css'

const IconLink = ({showText = true, text = 'Follow us:', align = 'right'}) => {
  return (
    <div className={`social-icon ${align}`}>
      {showText && <p>{text}</p>}
      <Link className="icon" to="#">
        <i className="fa fa-pinterest"></i>
      </Link>
      <Link className="icon" to="#">
        <i className="fa fa-facebook"></i>
      </Link>
      <Link className="icon" to="#">
        <i className="fa fa-twitter"></i>
      </Link>
      <Link className="icon" to="#">
        <i className="fa fa-dribbble"></i>
      </Link>
      <Link className="icon" to="#">
        <i className="fa fa-behance"></i>
      </Link>
    </div>
  )
}

export default IconLink
