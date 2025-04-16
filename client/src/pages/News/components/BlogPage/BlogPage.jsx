import {Link} from 'react-router-dom'
import BlogFilter from '../../../../components/BlogFilter/BlogFilter'
import SitePagination from '../../../../components/SitePagination/SitePagination'
import StickSidebar from '../../../../components/StickSidebar/StickSidebar'
import WidgetItem from '../../../../components/WidgetItem/WidgetItem'
import Category from '../../../../components/Category/Category'
import TrendingWidget from '../../../../components/TrendingWidget/TrendingWidget'
import LatestComment from '../../../../components/LatestComment/LatestComment'
import BlogContent from '../BlogContent/BlogContent'
import './BlogPage.css'
import blogBig1 from '../../../../assets/img/blog-big/1.jpg'
import blogBig2 from '../../../../assets/img/blog-big/2.jpg'
import blogBig3 from '../../../../assets/img/blog-big/3.jpg'
import add from '../../../../assets/img/add.jpg'

const itemInCategory = [
  'Games',
  'Gaming Tips & Tricks',
  'Online Games',
  'Team Games',
  'Community',
  'Uncategorized',
]

const blogFilter = [
  {id: 1, link: '#', name: 'Racing'},
  {id: 2, link: '#', name: 'Shooters'},
  {id: 3, link: '#', name: 'Strategy'},
  {id: 4, link: '#', name: 'Online'},
]

const BlogPage = () => {
  return (
    <section className="blog-page">
      <div className="container">
        <div className="row">
          <div className="col-1">
            <BlogFilter blogFilter={blogFilter} />
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
            <StickSidebar>
              <WidgetItem isShowTitle={true} title="Trending">
                <TrendingWidget />
              </WidgetItem>
              <WidgetItem>
                <Category items={itemInCategory} />
              </WidgetItem>
              <WidgetItem isShowTitle={true} title="Latest comment">
                <LatestComment />
              </WidgetItem>
              <WidgetItem>
                <Link to="#" className="add">
                  <img src={add} alt="add" />
                </Link>
              </WidgetItem>
            </StickSidebar>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BlogPage
