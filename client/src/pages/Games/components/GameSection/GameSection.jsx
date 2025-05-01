import {Fragment, useMemo, useState} from 'react'
import {useSearchParams} from 'react-router-dom'
import Category from '../../../../components/Category/Category'
import StickSidebar from '../../../../components/StickSidebar/StickSidebar'
import WidgetItem from '../../../../components/WidgetItem/WidgetItem'
import SitePaginationWrapper from '../../../../components/PaginationWrapper/PaginationWrapper'
import GameItem from '../GameItem/GameItem'
import useFetchData from '../../../../hooks/useFetchData'
import './GameSection.css'

const GameSection = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedGenre = searchParams.get('genre') || null
  const selectedPlatform = searchParams.get('platform') || null

  const params = useMemo(
    () => ({
      genre: selectedGenre,
      platform: selectedPlatform,
    }),
    [selectedGenre, selectedPlatform],
  )

  const [currentPage, setCurrentPage] = useState(1)

  const {
    data: games,
    loading,
    error,
  } = useFetchData('http://localhost:4000/games', params)

  const {data: genres} = useFetchData('http://localhost:4000/genre')
  const {data: platform} = useFetchData('http://localhost:4000/platform')

  const updateQueryParams = (key, value) => {
    const newParams = new URLSearchParams(searchParams)
    if (value) {
      newParams.set(key, value)
    } else {
      newParams.delete(key)
    }

    setSearchParams(newParams)
  }

  return (
    <Fragment>
      <section className="games-section">
        <div className="container">
          <div className="row">
            <div className="col-1">
              {loading && <p>Loading games...</p>}
              {error && <p>{error}</p>}
              {games && (
                <SitePaginationWrapper
                  data={games}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  pageSize={3}
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
              )}
            </div>
            <div className="col-2">
              <StickSidebar>
                <WidgetItem key="genre">
                  {genres && (
                    <Category
                      title="Genres"
                      items={genres.map(c => c.name)}
                      queryKey="genre"
                      onSelect={genre => updateQueryParams('genre', genre)}
                    />
                  )}
                </WidgetItem>

                <WidgetItem key="platform">
                  {platform && (
                    <Category
                      title="Platform"
                      items={platform.map(p => p.name)}
                      queryKey="platform"
                      onSelect={platform =>
                        updateQueryParams('platform', platform)
                      }
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
