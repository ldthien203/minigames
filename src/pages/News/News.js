import {Fragment} from 'react'
import PageTop from '../../components/PageTopSection/PageTopSection'
import BlogPage from './components/BlogPage/BlogPage'
import NewsLetterSection from '../../components/NewsLetter/NewsLetter'

const News = () => {
  return (
    <Fragment>
      <PageTop title="News" background="news" />
      <BlogPage />
      <NewsLetterSection />
    </Fragment>
  )
}

export default News
