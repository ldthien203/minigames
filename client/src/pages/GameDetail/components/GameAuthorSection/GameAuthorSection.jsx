import './GameAuthorSection.css'

const GameAuthorSection = ({
  userName = 'Admin',
  userComment = 'This is great',
}) => {
  return (
    <section className="game-author-section">
      <div className="container">
        <div className="game-author-pic">
          <img src="./assets/img/author.jpg" alt="author avatar" />
        </div>
        <div className="game-author-info">
          <h4>Written by: {userName}</h4>
          <p>{userComment}</p>
        </div>
      </div>
    </section>
  )
}

export default GameAuthorSection
