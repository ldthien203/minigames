import {Link} from 'react-router-dom'
import useFetchData from '../../hooks/useFetchData'
import Loading from '../Loading/Loading'
import './LatestComment.css'

const LatestComment = () => {
  const {data, loading, error} = useFetchData(
    `${process.env.REACT_APP_API_URL}/comment/latest`,
  )

  if (loading) return <Loading />
  if (error) return <p>Error: {error.message}</p>

  return (
    <div className="latest-comments">
      {data &&
        data.map(cmt => (
          <div key={cmt.cmt_id} className="lc-item">
            <img
              src={cmt?.avatar || '/assets/img/avatar.png'}
              alt="lc-avatar"
              className="lc-avatar"
            />
            <div className="tw-text">
              <p>{cmt.username}</p>
              <span> On </span>
              <Link to={`/news/${cmt.news_id}`}>{cmt.title}</Link>
            </div>
          </div>
        ))}
    </div>
  )
}

export default LatestComment
