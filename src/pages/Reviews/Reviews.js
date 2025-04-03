import PageTopSection from '../../components/PageTopSection/PageTopSection'
import ReviewSection from './components/ReviewSection/ReviewSection'
import NewsLetter from '../../components/NewsLetter/NewsLetter'
import {Fragment} from 'react'

const Reviews = () => {
  return (
    <Fragment>
      <PageTopSection title="Reviews" background="reviews" />
      <ReviewSection />
      <NewsLetter />
    </Fragment>
  )
}

export default Reviews
