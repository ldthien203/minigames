import {Link} from 'react-router'
import './NewsLetter.css'

const NewsLetter = () => {
  return (
    <section className="newsletter-section">
      <div className="container">
        <h2>Subscribe to our newsletter</h2>
        <form className="newsletter-form">
          <input type="text" placeholder="ENTER YOUR E-MAIL"></input>
          <Link to="#" className="site-button">
            subscribe <img src="/assets/img/icons/double-arrow.png" alt="#" />
          </Link>
        </form>
      </div>
    </section>
  )
}

export default NewsLetter
