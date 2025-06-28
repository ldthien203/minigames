import {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Cookies from 'js-cookie'
import useFetchData from '../../hooks/useFetchData'
import StickSidebar from '../../components/StickSidebar/StickSidebar'
import WidgetItem from '../../components/WidgetItem/WidgetItem'
import TrendingWidget from '../../components/TrendingWidget/TrendingWidget'
import Comment from '../../components/Comment/Comment'
import Loading from '../../components/Loading/Loading'
import './NewsDetail.css'

const VIEW_TIMEOUT = 3600

const NewsDetail = () => {
  const {id} = useParams()
  const {data, loading, error} = useFetchData(
    `${process.env.REACT_APP_API_URL}/news/${id}`,
  )

  useEffect(() => {
    const news_id = id
    const now = Math.floor(Date.now() / 1000)

    let viewedNews = {}
    try {
      viewedNews = JSON.parse(Cookies.get('viewedNews') || '{}')
    } catch {
      viewedNews = {}
    }

    const lastViewed = viewedNews[news_id]
    if (!lastViewed || now - lastViewed > VIEW_TIMEOUT) {
      const controller = new AbortController()

      const timer = setTimeout(() => {
        fetch(`${process.env.REACT_APP_API_URL}/news/${news_id}/view`, {
          method: 'POST',
          signal: controller.signal,
        }).catch(err => {
          if (err.name !== 'AbortError') {
            console.error('Error counting view', err.message)
          }
        })
      }, 5000)

      return () => {
        clearTimeout(timer)
        controller.abort()
      }
    }
  }, [id])

  return (
    <section className="news-detail">
      <div className="container">
        <div className="row">
          <div className="col-1">
            {loading && <Loading />}
            {error && <p>{error}</p>}
            {data && (
              <>
                <h1 className="news-title">{data.title}</h1>
                <h4 className="news-meta">Published on {data.publish_date}</h4>
                <h3 className="">{data.news_type}</h3>
                <p className="news-content">{data.content}</p>
                <Comment type="news" id={data.news_id} />
              </>
            )}
          </div>
          <div className="col-2">
            <StickSidebar>
              <WidgetItem isShowTitle={true} title="Trending News">
                <TrendingWidget />
              </WidgetItem>
            </StickSidebar>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewsDetail
