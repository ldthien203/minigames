import {Link} from 'react-router'
import './FeaturedSection.css'
import doubleArrow from '../../assets/img/icons/double-arrow.png'

const FeaturedSection = ({
  date = new Date().toLocaleDateString().replaceAll('/', '.'),
  category = 'Games',
  title = 'The game you’ve been waiting for is out now',
  desc = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquamet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vestibulum posuere porttitor justo id pellentesque. Proin id lacus feugiat, posuere erat sit amet, commodo ipsum. Donec pellentesque vestibulum metus...',
}) => {
  return (
    <section className="featured-section">
      <div className="featured-bg"></div>
      <div className="featured-box">
        <div className="text-box">
          <div className="top-meta">
            {date} / in
            <Link to={`/${category.toLowerCase()}`}>{' ' + category}</Link>
          </div>
          <h3>{title}</h3>
          <p>{desc}</p>
          <Link to="#" className="read-more">
            Read more <img src={doubleArrow} alt="arrow icon" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedSection
