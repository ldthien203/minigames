import {Link} from 'react-router'
import './MiniCard.css'

const MiniCard = ({
  date = new Date().toLocaleDateString().replaceAll('/', '.'),
  category,
  title,
  img = 1,
}) => {
  return (
    <div className="tw-item">
      <div className="tw-thumb">
        <img
          src={require(`../../../../assets/img/blog-widget/${img}.jpg`)}
          alt="widget-thumb"
        />
      </div>
      <div className="tw-text">
        <div className="tw-meta">
          {date} / in
          <Link to="#">{' ' + category}</Link>
        </div>
        <h5>{title}</h5>
      </div>
    </div>
  )
}

export default MiniCard
