import {Link} from 'react-router'
import './IntroCard.css'

const IntroCard = ({
  date = new Date().toLocaleDateString().replaceAll('/', '.'),
  category,
  title,
  description,
  isShowDesc = true,
  link = 'read more',
  isShowLink = true,
  img = 1,
  isShowImg = false,
}) => {
  return (
    <div className="card-container">
      {isShowImg && (
        <div className="card-image">
          <img
            src={require(`../../assets/img/blog/${img}.jpg`)}
            alt="card-image"
          />
        </div>
      )}
      <div className="intro-text-box">
        <div className="top-meta">
          {date} / in
          <Link to="#"> {category}</Link>
        </div>
        <h3>{title}</h3>
        {isShowDesc && <p>{description}</p>}
        {isShowLink && (
          <Link to="#" className="read-more">
            {link}
            <img
              src={require('../../assets/img/icons/double-arrow.png')}
              alt="double-arrow"
            />
          </Link>
        )}
      </div>
    </div>
  )
}

export default IntroCard
