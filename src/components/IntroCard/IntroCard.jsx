import {Link} from 'react-router'
import './IntroCard.css'

const IntroCard = ({
  date = new Date().toLocaleDateString().replaceAll('/', '.'),
  category,
  title,
  description,
  link = 'read more',
}) => {
  return (
    <div className="intro-text-box">
      <div className="top-meta">
        {date} / in
        <Link to="#"> {category}</Link>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <Link to="#" className="read-more">
        {link}
        <img
          src={require('../../assets/img/icons/double-arrow.png')}
          alt="double-arrow"
        />
      </Link>
    </div>
  )
}

export default IntroCard
