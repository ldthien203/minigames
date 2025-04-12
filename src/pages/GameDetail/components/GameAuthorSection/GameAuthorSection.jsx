import './GameAuthorSection.css'
import authorImg from '../../../../assets/img/author.jpg'

const GameAuthorSection = () => {
  return (
    <section className="game-author-section">
      <div className="container">
        <div className="game-author-pic">
          <img src={authorImg} alt="author avatar" />
        </div>
        <div className="game-author-info">
          <h4>Written by: Michael Williams</h4>
          <p>
            Vivamus volutpat nibh ac sollicitudin imperdiet. Donec scelerisque
            lorem sodales odio ultricies, nec rhoncus ex lobortis. Vivamus
            tincid-unt sit amet sem id varius. Donec elementum aliquet tortor.
            Curabitur justo mi, efficitur sed eros alique.
          </p>
        </div>
      </div>
    </section>
  )
}

export default GameAuthorSection
