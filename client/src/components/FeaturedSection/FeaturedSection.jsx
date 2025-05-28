import {Link} from 'react-router'
import './FeaturedSection.css'
import {useEffect, useState} from 'react'

const FeaturedSection = () => {
  const [newGame, setNewGame] = useState({})

  useEffect(() => {
    const fetchNewGame = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/games/newest`)
        const data = await response.json()
        setNewGame(data)
      } catch (error) {
        console.error('Error fetching new game', error.message)
      }
    }
    fetchNewGame()
  }, [])

  return (
    <section className="featured-section">
      <div
        className="featured-bg"
        style={{backgroundImage: `url('/assets/img/featured-bg.jpg')`}}
      ></div>
      <div className="featured-box">
        <div className="text-box">
          {newGame && (
            <>
              <div className="top-meta">
                {newGame.release_date} / in
                <Link to="/games"> Games</Link>
              </div>
              <h3>The game you've been waiting for is out now</h3>
              <h4>{newGame.name}</h4>
              <p>{newGame.summary}</p>
              <Link to={`/games/${newGame.game_id}`} className="read-more">
                Read more{' '}
                <img
                  src="/assets/img/icons/double-arrow.png"
                  alt="arrow icon"
                />
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default FeaturedSection
