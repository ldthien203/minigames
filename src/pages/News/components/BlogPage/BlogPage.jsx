import BlogFilter from '../../../../components/BlogFilter/BlogFilter'
import SitePagination from '../../../../components/SitePagination/SitePagination'
import StickSidebar from '../../../../components/StickSidebar/StickSidebar'
import BlogContent from '../BlogContent/BlogContent'
import './BlogPage.css'
import blogBig1 from '../../../../assets/img/blog-big/1.jpg'
import blogBig2 from '../../../../assets/img/blog-big/1.jpg'
import blogBig3 from '../../../../assets/img/blog-big/1.jpg'

const BlogPage = () => {
  return (
    <section className="blog-page">
      <div className="container">
        <div className="row">
          <div className="col-1">
            <BlogFilter />
            <BlogContent
              title="The best online game is out now!"
              img={blogBig1}
            />
            <BlogContent
              title="The best online game is out now!"
              img={blogBig2}
            />
            <BlogContent
              title="The best online game is out now!"
              img={blogBig3}
            />
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
