import {Link} from 'react-router'
import './MiniCard.css'

const MiniCard = ({
  date = new Date().toLocaleDateString().replaceAll('/', '.'),
  id,
  category = 'news',
  title,
  viewCount = 1,
  img = '/assets/img/blog-widget/1.jpg',
}) => {
  return (
    <div className="tw-item">
      <div className="tw-text">
        <div className="tw-meta">
          <div className="left-meta">
            {date} / in
            <Link to={`/${category.toLowerCase()}`}>{' ' + category}</Link>
          </div>
          <div className="right-meta">
            <img src="/assets/img/icons/viewer.png" alt="view" />
            <span className="view-count">{viewCount} views</span>
          </div>
        </div>
        <Link to={`/news/${id}`}>
          {' '}
          <h5>{title}</h5>
        </Link>
      </div>
    </div>
  )
}

export default MiniCard
