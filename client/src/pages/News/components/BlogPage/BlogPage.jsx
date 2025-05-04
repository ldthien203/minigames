import {useState} from 'react'
import {Link} from 'react-router-dom'
import BlogFilter from '../../../../components/BlogFilter/BlogFilter'
import StickSidebar from '../../../../components/StickSidebar/StickSidebar'
import WidgetItem from '../../../../components/WidgetItem/WidgetItem'
import Category from '../../../../components/Category/Category'
import TrendingWidget from '../../../../components/TrendingWidget/TrendingWidget'
import LatestComment from '../../../../components/LatestComment/LatestComment'
import SitePaginationWrapper from '../../../../components/PaginationWrapper/PaginationWrapper'
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
  const [currentPage, setCurrentPage] = useState(1)

  const {
    data: news,
    loading,
    error,
  } = useFetchData('http://localhost:4000/news')

  const {
    data: newsType,
    loading: loadingNewsType,
    error: errorNewsType,
  } = useFetchData('http://localhost:4000/news/type')

  return (
    <section className="blog-page">
      <div className="container">
        <div className="row">
          <div className="col-1">
            {loadingNewsType && <p>Loading games...</p>}
            {errorNewsType && <p>{errorNewsType}</p>}
            {newsType && (
              <BlogFilter
                filters={newsType}
                queryKey="type"
                labelKey="type"
                idKey="news_type_id"
              />
            )}
            {loading && <p>Loading games...</p>}
            {error && <p>{error}</p>}
            {news && (
              <SitePaginationWrapper
                data={news}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              >
                {currentTableData =>
                  currentTableData.map(blog => (
                    <BlogContent
                      key={blog.news_id}
                      id={blog.news_id}
                      title={blog.title}
                      img={blogBig1}
                      content={blog.content}
                      date={blog.publish_date}
                      category={blog.category_name}
                    />
                  ))
                }
              </SitePaginationWrapper>
            )}
          </div>
          <div className="col-2">
            <StickSidebar>
              <WidgetItem isShowTitle={true} title="Trending News">
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
