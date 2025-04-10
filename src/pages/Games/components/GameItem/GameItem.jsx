import {Link} from 'react-router'
import './GameItem.css'

const GameItem = ({
  title,
  image = '../../../../assets/img/games/1.jpg',
  link = '#',
}) => {
  return (
    <div className="game-item">
      <img src={image} alt="item pic" />
      <h5>{title}</h5>
      <Link to={link} className="read-more">
        Read more
        <img
          src={require('../../../../assets/img/icons/double-arrow.png')}
          alt="double arrow icon"
        />
      </Link>
    </div>
  )
}

export default GameItem
