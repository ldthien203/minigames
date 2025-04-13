import {Link} from 'react-router'
import './GameItem.css'
import doubleArrow from '../../../../assets/img/icons/double-arrow.png'

const GameItem = ({
  title,
  image = '../../../../assets/img/games/1.jpg',
  link = '/games/detail',
}) => {
  return (
    <div className="game-item">
      <img src={image} alt="item pic" />
      <h5>{title}</h5>
      <Link to={link} className="read-more">
        Read more
        <img src={doubleArrow} alt="double arrow icon" />
      </Link>
    </div>
  )
}

export default GameItem
