import {Link} from 'react-router-dom'
import IconLink from '../../../../components/IconLink/IconLink'
import StickSidebar from '../../../../components/StickSidebar/StickSidebar'
import './GamesSinglePage.css'
import WidgetItem from '../../../../components/WidgetItem/WidgetItem'

const GamesSinglePage = ({game = {}}) => {
  return (
    <section className="games-single-page">
      <div className="container">
        <div className="game-single-preview">
          <img src={game?.image} alt="game" />
        </div>
        <div className="row">
          <div className="col-1 game-single-content">
            <div className="gs-meta">
              {game?.release_date} / in
              <Link to="/games"> Games</Link>
            </div>
            <h2 className="gs-title">{game?.name}</h2>
            <h4>Gameplay</h4>
            <p>{game?.summary}</p>
            <h4>Conclusion</h4>
            <p>{game?.conclusion}</p>
            <IconLink text="Share: " align="left" />
          </div>
          <div className="col-2">
            <StickSidebar>
              <div className="widget-container">
                <WidgetItem isShowTitle={true} title="Ratings">
                  <ul>
                    <li>
                      Price <span>{game?.avg_price}/10</span>
                    </li>
                    <li>
                      Graphics <span>{game?.avg_graphics}/10</span>
                    </li>
                    <li>
                      Levels <span>{game?.avg_levels}/10</span>
                    </li>
                    <li>
                      Soundtrack <span>{game?.avg_soundtrack}/10</span>
                    </li>
                    <li>
                      Gameplay <span>{game?.avg_gameplay}/10</span>
                    </li>
                  </ul>
                  <div className="rating">
                    <h5>
                      <i>Rating</i>
                      <span>
                        {(game?.avg_price +
                          game?.avg_graphics +
                          game?.avg_levels +
                          game?.avg_soundtrack +
                          game?.avg_gameplay) /
                          5}
                      </span>{' '}
                      / 10
                    </h5>
                  </div>
                </WidgetItem>
              </div>
              <div className="widget-container">
                <WidgetItem isShowTitle={true} title="Testimonials">
                  <div className="testim-text">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolo re
                      magna aliqua. Quis ipsum suspend isse ultrices.
                    </p>
                    <h6>
                      <span>James Smith,</span> Gamer
                    </h6>
                  </div>
                </WidgetItem>
              </div>
            </StickSidebar>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GamesSinglePage
