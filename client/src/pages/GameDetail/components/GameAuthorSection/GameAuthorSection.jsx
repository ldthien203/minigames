import './GameAuthorSection.css'
import authorImg from '../../../../assets/img/author.jpg'

const GameAuthorSection = ({game = {}}) => {
  return (
    <section className="game-author-section">
      <div className="container">
        <div className="game-author-pic">
          <img src={authorImg} alt="author avatar" />
        </div>
        <div className="game-author-info">
          <h4>Written by: {game.user_name}</h4>
          <p>{game.user_comment}</p>
        </div>
      </div>
    </section>
  )
}

export default GameAuthorSection
