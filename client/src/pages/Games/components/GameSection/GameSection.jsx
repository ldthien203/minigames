import {Fragment, useState} from 'react'
import Category from '../../../../components/Category/Category'
import SitePagination from '../../../../components/SitePagination/SitePagination'
import StickSidebar from '../../../../components/StickSidebar/StickSidebar'
import WidgetItem from '../../../../components/WidgetItem/WidgetItem'
import GameItem from '../GameItem/GameItem'
import useFetchData from '../../../../hooks/useFetchData'
import './GameSection.css'

const GameSection = () => {
  const [data, setData] = useState([])

  const [genre, setGenre] = useState([])
  const [platform, setPlatform] = useState([])

  useFetchData(
    'http://localhost:4000/games/games',
    setData,
    'Error fetching games for game pages',
  )

  useFetchData(
    'http://localhost:4000/genre',
    setGenre,
    'Error fetching all genres',
  )

  useFetchData(
    'http://localhost:4000/platform',
    setPlatform,
    'Error fetching all platforms',
  )

  return (
    <Fragment>
      <section className="games-section">
        <div className="container">
          <div className="row">
            <div className="col-1">
              <div className="row">
                {data.map(item => (
                  <div key={item.game_id} className="child-col">
                    <GameItem
                      id={item.game_id}
                      title={item.name}
                      image={item.thumbnail}
                    />
                  </div>
                ))}
              </div>
              <SitePagination />
            </div>
            <div className="col-2">
              <StickSidebar>
                <WidgetItem key="genre">
                  {genre && (
                    <Category
                      title="Genres"
                      items={genre.map(c => c.name)}
                      queryKey="genre"
                    />
                  )}
                </WidgetItem>

                <WidgetItem key="platform">
                  {platform && (
                    <Category
                      title="Platform"
                      items={platform.map(p => p.name)}
                      queryKey="platform"
                    />
                  )}
                </WidgetItem>
              </StickSidebar>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export default GameSection
