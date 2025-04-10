import PageTopSection from '../../components/PageTopSection/PageTopSection'
import ReviewSection from './components/ReviewSection/ReviewSection'
import NewsLetter from '../../components/NewsLetter/NewsLetter'
import {Fragment} from 'react'
import pageTopBg from '../../assets/img/page-top-bg/2.jpg'

const Reviews = () => {
  return (
    <Fragment>
      <PageTopSection title="Reviews" background={pageTopBg} />
      <ReviewSection />
      <NewsLetter />
    </Fragment>
  )
}

export default Reviews
