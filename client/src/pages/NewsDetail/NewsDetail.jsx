import {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Cookies from 'js-cookie'
import useFetchData from '../../hooks/useFetchData'
import StickSidebar from '../../components/StickSidebar/StickSidebar'
import WidgetItem from '../../components/WidgetItem/WidgetItem'
import TrendingWidget from '../../components/TrendingWidget/TrendingWidget'
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
      const timer = setTimeout(() => {
        fetch(`${process.env.REACT_APP_API_URL}/news/${news_id}/view`, {
          method: 'POST',
        })
      }, 5000)

      return () => clearTimeout(timer)
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

                {data.comments && data.comments.length > 0 ? (
                  <div className="comments-section">
                    <h3>User Comments</h3>
                    <ul className="comments-list">
                      {data.comments.map((comment, index) => (
                        <li key={index} className="comment-item">
                          <p>
                            <strong>{comment.user_username}</strong>{' '}
                            {comment.user_comment}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p>No comments yet. Be the first to comment</p>
                )}
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
