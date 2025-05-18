import {Fragment, useMemo} from 'react'
import {useSearchParams} from 'react-router-dom'
import Category from '../../../../components/Category/Category'
import StickSidebar from '../../../../components/StickSidebar/StickSidebar'
import WidgetItem from '../../../../components/WidgetItem/WidgetItem'
import PaginationWrapper from '../../../../components/PaginationWrapper/PaginationWrapper'
import GameItem from '../GameItem/GameItem'
import useFetchData from '../../../../hooks/useFetchData'
import updateQueryParams from '../../../../utils/queryUtils'
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

  const {
    data: games,
    loading,
    error,
  } = useFetchData('http://localhost:4000/games', params)

  const {data: genres} = useFetchData('http://localhost:4000/genre')
  const {data: platform} = useFetchData('http://localhost:4000/platform')

  return (
    <Fragment>
      <section className="games-section">
        <div className="container">
          <div className="row">
            <div className="col-1">
              {loading && <p>Loading games...</p>}
              {error && <p>{error}</p>}
              {games && (
                <PaginationWrapper data={games} pageSize={9}>
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
                </PaginationWrapper>
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
                      onSelect={genre =>
                        updateQueryParams(
                          'genre',
                          genre,
                          searchParams,
                          setSearchParams,
                        )
                      }
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
                        updateQueryParams(
                          'platform',
                          platform,
                          searchParams,
                          setSearchParams,
                        )
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
