import PageTop from '../../components/PageTopSection/PageTopSection'
import NewsLetter from '../../components/NewsLetter/NewsLetter'
import ContactPage from './components/ContactPage/ContactPage'
import {Fragment} from 'react'

const Contact = () => {
  return (
    <Fragment>
      <PageTop title="Contact" background="contact" />
      <ContactPage />
      <NewsLetter />
    </Fragment>
  )
}

export default Contact
