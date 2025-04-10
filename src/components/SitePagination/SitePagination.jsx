import {Link} from 'react-router-dom'
import './SitePagination.css'

const SitePagination = () => {
  return (
    <div className="site-pagination">
      <Link to="#" className="active">
        01.
      </Link>
      <Link to="#">02.</Link>
      <Link to="#">03.</Link>
    </div>
  )
}

export default SitePagination
