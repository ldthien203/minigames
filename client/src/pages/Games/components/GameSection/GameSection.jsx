import {Fragment, useEffect, useState} from 'react'
import Category from '../../../../components/Category/Category'
import StickSidebar from '../../../../components/StickSidebar/StickSidebar'
import WidgetItem from '../../../../components/WidgetItem/WidgetItem'
import SitePaginationWrapper from '../../../../components/PaginationWrapper/PaginationWrapper'
import GameItem from '../GameItem/GameItem'
import useFetchData from '../../../../hooks/useFetchData'
import './GameSection.css'

const GameSection = () => {
  const [data, setData] = useState([])
  const [genre, setGenre] = useState([])
  const [platform, setPlatform] = useState([])

  const [selectedGenre, setSelectedGenre] = useState(null)
  const [selectedPlatform, setSelectedPlatform] = useState(null)

  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const fetchFilteredGames = async () => {
      try {
        const queryParams = new URLSearchParams()
        if (selectedGenre) queryParams.append('genre', selectedGenre)
        if (selectedPlatform) queryParams.append('platform', selectedPlatform)

        const response = await fetch(
          `http://localhost:4000/games/games?${queryParams.toString()}`,
        )

        const data = await response.json()
        setData(data)
      } catch (error) {
        console.error('Error fetching filtered games:', error.message)
      }
    }
    fetchFilteredGames()
  }, [selectedGenre, selectedPlatform])

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
              <SitePaginationWrapper
                data={data}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pageSize={1}
              >
                {currentTableData => (
                  <div className="row">
                    {currentTableData.map(item => (
                      <div key={item.game_id} className="child-col">
                        <GameItem
                          id={item.game_id}
                          title={item.name}
                          image={item.thumbnail}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </SitePaginationWrapper>
            </div>
            <div className="col-2">
              <StickSidebar>
                <WidgetItem key="genre">
                  {genre && (
                    <Category
                      title="Genres"
                      items={genre.map(c => c.name)}
                      queryKey="genre"
                      onSelect={setSelectedGenre}
                    />
                  )}
                </WidgetItem>

                <WidgetItem key="platform">
                  {platform && (
                    <Category
                      title="Platform"
                      items={platform.map(p => p.name)}
                      queryKey="platform"
                      onSelect={setSelectedPlatform}
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
