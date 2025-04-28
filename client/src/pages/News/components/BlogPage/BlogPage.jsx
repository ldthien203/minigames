import {useState} from 'react'
import {Link} from 'react-router-dom'
import BlogFilter from '../../../../components/BlogFilter/BlogFilter'
import SitePagination from '../../../../components/SitePagination/SitePagination'
import StickSidebar from '../../../../components/StickSidebar/StickSidebar'
import WidgetItem from '../../../../components/WidgetItem/WidgetItem'
import Category from '../../../../components/Category/Category'
import TrendingWidget from '../../../../components/TrendingWidget/TrendingWidget'
import LatestComment from '../../../../components/LatestComment/LatestComment'
import BlogContent from '../BlogContent/BlogContent'
import useFetchData from '../../../../hooks/useFetchData'
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
  const [data, setData] = useState([])

  useFetchData('http://localhost:4000/news', setData, 'Failed to fetch data')

  return (
    <section className="blog-page">
      <div className="container">
        <div className="row">
          <div className="col-1">
            <BlogFilter blogFilter={blogFilter} />
            {data.map(blog => (
              <BlogContent
                title={blog.title}
                img={blogBig1}
                content={blog.content}
                date={blog.publish_date}
                category={blog.category_name}
              />
            ))}
            <SitePagination />
          </div>
          <div className="col-2">
            <StickSidebar>
              <WidgetItem isShowTitle={true} title="Trending">
                <TrendingWidget />
              </WidgetItem>
              <WidgetItem>
                <Category title="Category" items={itemInCategory} />
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
