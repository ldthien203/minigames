import {Fragment} from 'react'
import {Link} from 'react-router-dom'
import './BlogContent.css'

const BlogContent = ({
  date = new Date().toLocaleDateString().replaceAll('/', '.'),
  category = 'Games',
  title = 'The best VR games on the market',
  description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.Vivamus volutpat nibh ac sollicitudin imperdiet. Donec scelerisque lorem sodales odio ultricies, nec rhoncus ex lobortis. Vivamus tincidunt sit amet sem id varius. Donec elementum aliquet tortor. Curabitur justo mi, efficitur sed eros aliquealiqua.....',
  link = '/',
  img = 1,
}) => {
  return (
    <Fragment>
      <div className="big-blog-item">
        <img
          src={require(`../../../../assets/img/blog-big/${img}.jpg`)}
          alt="#"
          className="blog-thumbnail"
        />
        <div className="blog-content">
          <div className="top-meta">
            {date} / in
            <Link to={link}>{' ' + category}</Link>
          </div>
          <h3>{title}</h3>
          <p>{description}</p>
          <Link to="#" className="read-more">
            Read more
            <img
              src={require('../../../../assets/img/icons/double-arrow.png')}
              alt="#"
            />
          </Link>
        </div>
      </div>
    </Fragment>
  )
}

export default BlogContent
