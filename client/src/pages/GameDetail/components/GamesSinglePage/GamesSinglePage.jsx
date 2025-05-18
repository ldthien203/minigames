import {Link} from 'react-router-dom'
import IconLink from '../../../../components/IconLink/IconLink'
import StickSidebar from '../../../../components/StickSidebar/StickSidebar'
import Category from '../../../../components/Category/Category'
import './GamesSinglePage.css'
import WidgetItem from '../../../../components/WidgetItem/WidgetItem'

const GamesSinglePage = ({
  game = {
    screenshot: '/assets/img/games/1.jpg',
    release_date: '01.05.2025',
    name: 'New game',
    summary: 'Summary',
    conclusion: 'Conclusion',
    avg_price: 5,
    avg_graphics: 5,
    avg_levels: 5,
    avg_soundtrack: 5,
    avg_gameplay: 5,
    avg_rating: 5,
    genre_short_name: 'FPS',
  },
}) => {
  return (
    <section className="games-single-page">
      <div className="container">
        <div className="game-single-preview">
          <img src={game?.screenshot} alt="game" />
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
                      <span>{game?.avg_rating}</span> / 10
                    </h5>
                  </div>
                </WidgetItem>
              </div>
              <div className="widget-container">
                <WidgetItem isShowTitle={true} title="Genres">
                  <div className="testim-text">
                    {game?.genre_short_name &&
                    game?.genre_short_name.length > 1 ? (
                      <Category
                        title="Genres"
                        items={game?.genre_short_name}
                        queryKey="genres"
                      />
                    ) : (
                      <p>{game?.genre_short_name}</p>
                    )}
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
