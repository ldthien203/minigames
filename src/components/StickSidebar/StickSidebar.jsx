import {Link} from 'react-router-dom'
import TrendingWidget from './components/TrendingWidget/TrendingWidget'
import Category from '../Category/Category'
import LatestComment from './components/LatestComment/LatestComment'
import './StickSidebar.css'

const StickSidebar = ({isShowLatestCmt = false}) => {
  const itemInCategory = [
    'Games',
    'Gaming Tips & Tricks',
    'Online Games',
    'Team Games',
    'Community',
    'Uncategorized',
  ]

  return (
    <div id="stickSidebar">
      <div className="inner-wrapper-sticky">
        <div className="widget-item">
          <h4 className="widget-title">Trending</h4>
          <TrendingWidget />
        </div>
        <div className="widget-item">
          <Category title="Categories" items={itemInCategory} />
        </div>
        {isShowLatestCmt && (
          <div className="widget-item">
            <h4 className="widget-title">Latest comment</h4>
            <LatestComment />
          </div>
        )}
        <div className="widget-item">
          <Link to="#" className="add">
            <img src={require('../../assets/img/add.jpg')} alt="add" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default StickSidebar
