import {Fragment} from 'react'
import PageTop from '../../components/PageTopSection/PageTopSection'
import BlogPage from './components/BlogPage/BlogPage'
import NewsLetter from '../../components/NewsLetter/NewsLetter'
import pageTopBg from '../../assets/img/page-top-bg/3.jpg'

const News = () => {
  return (
    <Fragment>
      <PageTop title="News" background={pageTopBg} />
      <BlogPage />
      <NewsLetter />
    </Fragment>
  )
}

export default News
