import {useMemo} from 'react'
import {Link, useSearchParams} from 'react-router-dom'
import BlogFilter from '../../../../components/BlogFilter/BlogFilter'
import StickSidebar from '../../../../components/StickSidebar/StickSidebar'
import WidgetItem from '../../../../components/WidgetItem/WidgetItem'
import TrendingWidget from '../../../../components/TrendingWidget/TrendingWidget'
import LatestComment from '../../../../components/LatestComment/LatestComment'
import PaginationWrapper from '../../../../components/PaginationWrapper/PaginationWrapper'
import Loading from '../../../../components/Loading/Loading'
import BlogContent from '../BlogContent/BlogContent'
import useFetchData from '../../../../hooks/useFetchData'
import './BlogPage.css'

const BlogPage = () => {
  const [searchParams] = useSearchParams()
  const selectedType = searchParams.get('type') || null

  const params = useMemo(
    () => ({
      type: selectedType,
    }),
    [selectedType],
  )

  const {
    data: news,
    loading,
    error,
  } = useFetchData(`${process.env.REACT_APP_API_URL}/news`, params)

  const {
    data: newsType,
    loading: loadingNewsType,
    error: errorNewsType,
  } = useFetchData(`${process.env.REACT_APP_API_URL}/news/type`)

  return (
    <section className="blog-page">
      <div className="container">
        <div className="row">
          <div className="col-1">
            {loadingNewsType && <Loading />}
            {errorNewsType && <p>{errorNewsType}</p>}
            {newsType && (
              <BlogFilter
                filters={newsType}
                queryKey="type"
                labelKey="type"
                idKey="news_type_id"
              />
            )}
            {loading && <Loading />}
            {error && <p>{error}</p>}
            {news && (
              <PaginationWrapper data={news}>
                {currentTableData =>
                  currentTableData.map(blog => (
                    <BlogContent
                      key={blog.news_id}
                      id={blog.news_id}
                      title={blog.title}
                      content={blog.content}
                      date={blog.publish_date}
                      category={blog.category_name}
                    />
                  ))
                }
              </PaginationWrapper>
            )}
          </div>
          <div className="col-2">
            <StickSidebar>
              <WidgetItem isShowTitle={true} title="Trending News">
                <TrendingWidget />
              </WidgetItem>
              <WidgetItem isShowTitle={true} title="Latest comment">
                <LatestComment />
              </WidgetItem>
              <WidgetItem>
                <Link to="#" className="add">
                  <img src="/assets/img/add.jpg" alt="add" />
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
