import {Link} from 'react-router'
import './NewsLetter.css'
import doubleArrow from '../../assets/img/icons/double-arrow.png'

const NewsLetter = () => {
  return (
    <section className="newsletter-section">
      <div className="container">
        <h2>Subscribe to our newsletter</h2>
        <form className="newsletter-form">
          <input type="text" placeholder="ENTER YOUR E-MAIL"></input>
          <Link to="#" className="site-button">
            subscribe <img src={doubleArrow} alt="#" />
          </Link>
        </form>
      </div>
    </section>
  )
}

export default NewsLetter
