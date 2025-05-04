import {Link} from 'react-router'
import './MiniCard.css'

const MiniCard = ({
  date = new Date().toLocaleDateString().replaceAll('/', '.'),
  category = 'news',
  title,
  img = '../../../../assets/img/blog-widget/1.jpg',
}) => {
  return (
    <div className="tw-item">
      {/* <div className="tw-thumb">
        <img src={img} alt="widget-thumb" />
      </div> */}
      <div className="tw-text">
        <div className="tw-meta">
          {date} / in
          <Link to={`/${category.toLowerCase()}`}>{' ' + category}</Link>
        </div>
        <Link>
          {' '}
          <h5>{title}</h5>
        </Link>
      </div>
    </div>
  )
}

export default MiniCard
