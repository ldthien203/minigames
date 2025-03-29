import {Fragment} from 'react'
import {Link} from 'react-router-dom'
import './HeroSection.css'

const HeroSection = () => {
  return (
    <Fragment>
      <section className="hero-section">
        <div className="container">
          <h2 className="hero-title">Welcome to our game web!</h2>
          <p className="hero-text">
            Discover the latest gaming news, stay updated with trends, and enjoy
            exciting mini-games right on our website!
          </p>
          <Link to="#" className="site-button">
            read more
            <img
              src={require('../../assets/img/icons/double-arrow.png')}
              alt="read-more-button"
            />
          </Link>
        </div>
      </section>
    </Fragment>
  )
}

export default HeroSection
