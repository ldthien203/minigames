import {Link} from 'react-router'
import './GameItem.css'
import doubleArrow from '../../../../assets/img/icons/double-arrow.png'

const GameItem = ({
  id,
  title,
  image = '../../../../assets/img/games/1.jpg',
}) => {
  return (
    <div className="game-item">
      <img src={image} alt="item pic" className="thumbnail" />
      <h5>{title}</h5>
      <Link to={`/games/${id}`} className="read-more">
        Read more
        <img src={doubleArrow} alt="double arrow icon" />
      </Link>
    </div>
  )
}

export default GameItem
