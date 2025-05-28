import {useState} from 'react'
import useAuth from '../../../../hooks/useAuth'
import './ContactPage.css'

const ContactPage = () => {
  const {user} = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [successMessage, setSuccessMessage] = useState('')

  const handleChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/send-email`,
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(formData),
        },
      )

      if (!response.ok) {
        throw new Error(`Sending email failed`)
      }
      setFormData({name: '', email: '', subject: '', message: ''})
      setSuccessMessage('Sent successfully! Thank you for contacting us.')
      setTimeout(() => setSuccessMessage(''), 1000)
    } catch (error) {
      console.error('Error sening email: ', error.message)
    }
  }

  return (
    <section className="contact-page">
      <div className="container">
        <div className="map"></div>
        <div className="row">
          <div className="col-1">
            <form className="contact-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
              />
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email"
              />
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
              ></textarea>
              <button className="site-btn">
                Send message
                <img
                  src="/assets/img/icons/double-arrow.png"
                  alt="Send message button"
                />
              </button>
              {successMessage && (
                <div
                  className="success-message"
                  style={{color: 'green', marginTop: 10}}
                >
                  {successMessage}
                </div>
              )}
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
