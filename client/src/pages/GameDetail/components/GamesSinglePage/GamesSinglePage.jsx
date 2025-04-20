import {Link, useParams} from 'react-router-dom'
import IconLink from '../../../../components/IconLink/IconLink'
import StickSidebar from '../../../../components/StickSidebar/StickSidebar'
import './GamesSinglePage.css'
import WidgetItem from '../../../../components/WidgetItem/WidgetItem'
import {useEffect, useState} from 'react'

const GamesSinglePage = () => {
  const {id} = useParams()
  const [gameData, setGameData] = useState({})

  useEffect(() => {
    const fetchGameDetail = async () => {
      try {
        const response = await fetch(`http://localhost:4000/games/${id}`)
        const data = await response.json()
        console.log('------------------------data', data)
        setGameData(data[0])
      } catch (error) {
        console.error('Error fetching game detail: ', error)
      }
    }

    fetchGameDetail()
  }, [id])

  return (
    <section className="games-single-page">
      <div className="container">
        <div className="game-single-preview">
          <img src={gameData.screenshot} alt="game" />
        </div>
        <div className="row">
          <div className="col-1 game-single-content">
            <div className="gs-meta">
              {gameData.release_date} / in
              <Link to="/games"> Games</Link>
            </div>
            <h2 className="gs-title">{gameData.name}</h2>
            <h4>Gameplay</h4>
            <p>{gameData.summary}</p>
            <h4>Conclusion</h4>
            <p>{gameData.storyline}</p>
            <IconLink text="Share: " align="left" />
          </div>
          <div className="col-2">
            <StickSidebar>
              <div className="widget-container">
                <WidgetItem isShowTitle={true} title="Ratings">
                  <ul>
                    <li>
                      Price <span>3.5/5</span>
                    </li>
                    <li>
                      Graphics <span>4.5/5</span>
                    </li>
                    <li>
                      Levels <span>3.5/5</span>
                    </li>
                    <li>
                      Soundtrack <span>4.5/5</span>
                    </li>
                    <li>
                      Dificulty <span>4.5/5</span>
                    </li>
                  </ul>
                  <div className="rating">
                    <h5>
                      <i>Rating</i>
                      <span>4.5</span> / 5
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
