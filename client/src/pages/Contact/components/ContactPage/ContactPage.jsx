import useAuth from '../../../../hooks/useAuth'
import './ContactPage.css'
import doubleArrow from '../../../../assets/img/icons/double-arrow.png'
import iconLocation from '../../../../assets/img/icons/location.png'
import iconPhone from '../../../../assets/img/icons/phone.png'
import iconMail from '../../../../assets/img/icons/mail.png'

const ContactPage = () => {
  const {user} = useAuth()

  return (
    <section className="contact-page">
      <div className="container">
        <div className="map"></div>
        <div className="row">
          <div className="col-1">
            <form className="contact-form">
              <input type="text" placeholder="Your name" />
              <input type="text" placeholder="Your email" />
              <input type="text" placeholder="Subject" />
              <textarea placeholder="Message"></textarea>
              <button className="site-btn">
                Send message
                <img src={doubleArrow} alt="Send message button" />
              </button>
            </form>
          </div>
          <div className="col-2 text-white">
            <h3>{user.name}! Say hello</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
              ipsum suspendisse ultrices gravida. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua.....
            </p>
            <div className="cont-info">
              <div className="ci-icon">
                <img src={iconLocation} alt="icon location" />
              </div>
              <div className="ci-text">Main Str, no 23, New York</div>
            </div>
            <div className="cont-info">
              <div className="ci-icon">
                <img src={iconPhone} alt="icon phone" />
              </div>
              <div className="ci-text">+546 990221 123</div>
            </div>
            <div className="cont-info">
              <div className="ci-icon">
                <img src={iconMail} alt="icon mail" />
              </div>
              <div className="ci-text">hosting@contact.com</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactPage
