import BlogFilter from '../../../../components/BlogFilter/BlogFilter'
import SitePagination from '../../../../components/SitePagination/SitePagination'
import StickSidebar from '../../../../components/StickSidebar/StickSidebar'
import BlogContent from '../BlogContent/BlogContent'
import './BlogPage.css'

const BlogPage = () => {
  return (
    <section className="blog-page">
      <div className="container">
        <div className="row">
          <div className="col-1">
            <BlogFilter />
            <BlogContent />
            <BlogContent title="The best online game is out now!" img={2} />
            <BlogContent title="The best online game is out now!" img={3} />
            <SitePagination />
          </div>
          <div className="col-2">
            <StickSidebar isShowLatestCmt={true} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default BlogPage
