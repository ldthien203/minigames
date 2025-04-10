import PageTop from '../../components/PageTopSection/PageTopSection'
import NewsLetter from '../../components/NewsLetter/NewsLetter'
import ContactPage from './components/ContactPage/ContactPage'
import {Fragment} from 'react'
import pageTopBg from '../../assets/img/page-top-bg/4.jpg'

const Contact = () => {
  return (
    <Fragment>
      <PageTop title="Contact" background={pageTopBg} />
      <ContactPage />
      <NewsLetter />
    </Fragment>
  )
}

export default Contact
