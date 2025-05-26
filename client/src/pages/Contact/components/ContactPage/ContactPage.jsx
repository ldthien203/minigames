import useAuth from '../../../../hooks/useAuth'
import './ContactPage.css'

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
                <img
                  src="/assets/img/icons/double-arrow.png"
                  alt="Send message button"
                />
              </button>
            </form>
          </div>
          <div className="col-2 text-white">
            <h3>Hello, {user?.username ? user?.username : 'Friends'}!</h3>
            <p>
              If you have any questions, suggestions or would like to
              collaborate, please send me a message! I am always ready to listen
              and respond as soon as possible.
            </p>
            <div className="cont-info">
              <div className="ci-icon">
                <img src="/assets/img/icons/location.png" alt="icon location" />
              </div>
              <div className="ci-text">Tan Phu District, Ho Chi Minh City</div>
            </div>
            <div className="cont-info">
              <div className="ci-icon">
                <img src="/assets/img/icons/phone.png" alt="icon phone" />
              </div>
              <div className="ci-text">+0932083213</div>
            </div>
            <div className="cont-info">
              <div className="ci-icon">
                <img src="/assets/img/icons/mail.png" alt="icon mail" />
              </div>
              <div className="ci-text">ldthien203@gmail.com</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactPage
