import {Link} from 'react-router'
import './IntroCard.css'

const IntroCard = ({
  date = new Date().toLocaleDateString().replaceAll('/', '.'),
  category,
  title,
  description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.Vivamus volutpat nibh ac sollicitudin imperdiet. Donec scelerisque lorem sodales odio ultricies, nec rhoncus ex lobortis. Vivamus tincidunt sit amet sem id varius. Donec elementum aliquet tortor. Curabitur justo mi, efficitur sed eros aliquealiqua.....',
  isShowDesc = true,
  link = '/',
  isShowLink = true,
  img = 1,
  isShowImg = false,
  rating = 4.5,
  isShowRating = false,
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
        {isShowRating && (
          <div className="rating">
            <h5>
              <i>Rating </i>
              <span>{rating}</span> / 5
            </h5>
          </div>
        )}
        <div className="top-meta">
          {date} / in
          <Link to={`/${category}`}> {category}</Link>
        </div>
        <h3>{title}</h3>
        {isShowDesc && <p>{description}</p>}
        {isShowLink && (
          <Link to={link} className="read-more">
            Read more
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
