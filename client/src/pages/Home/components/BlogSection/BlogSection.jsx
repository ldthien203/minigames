import {useMemo} from 'react'
import {Link, useSearchParams} from 'react-router-dom'
import IntroCard from '../../../../components/IntroCard/IntroCard'
import BlogFilter from '../../../../components/BlogFilter/BlogFilter'
import StickSidebar from '../../../../components/StickSidebar/StickSidebar'
import TrendingWidget from '../../../../components/TrendingWidget/TrendingWidget'
import Category from '../../../../components/Category/Category'
import WidgetItem from '../../../../components/WidgetItem/WidgetItem'
import PaginationWrapper from '../../../../components/PaginationWrapper/PaginationWrapper'
import Loading from '../../../../components/Loading/Loading'
import useFetchData from '../../../../hooks/useFetchData'
import updateQueryParams from '../../../../utils/queryUtils'
import './BlogSection.css'

const BlogSection = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedGenre = searchParams.get('genre') || null
  const selectedPlatform = searchParams.get('platform') || null

  const param = useMemo(
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
  } = useFetchData(`${process.env.REACT_APP_API_URL}/games`, param)

  const {
    data: genre,
    loading: genreLoading,
    error: genreError,
  } = useFetchData(`${process.env.REACT_APP_API_URL}/genre`)

  const {
    data: platform,
    loading: platformLoading,
    error: platformError,
  } = useFetchData(`${process.env.REACT_APP_API_URL}/platform`)

  return (
    <section className="blog-section">
      <div className="container">
        <div className="row">
          <div className="col-1">
            <div className="section-title">
              <h2>Lastest Games</h2>
            </div>
            {genreLoading && <Loading />}
            {genreError && <p>{genreError.message}</p>}
            {genre && (
              <BlogFilter
                filters={genre}
                queryKey="genre"
                labelKey="short_name"
                idKey="genre_id"
              />
            )}
            {loading && <Loading />}
            {error && <p>{error.message}</p>}
            {games && (
              <PaginationWrapper data={games} pageSize={4}>
                {currentTableData =>
                  currentTableData.map(card => (
                    <div key={card.game_id} className="blog-item">
                      <IntroCard
                        id={card.game_id}
                        title={card.name}
                        description={card.summary}
                        category={card.category_name}
                        img={card.thumbnail}
                        isShowImg={true}
                        rating={card.rating}
                        date={card.release_date}
                        categoryLink={`/${card.category_name.toLowerCase()}`}
                        readMoreLink={`/${card.category_name.toLowerCase()}/${
                          card.game_id
                        }`}
                      />
                    </div>
                  ))
                }
              </PaginationWrapper>
            )}
          </div>
          <div className="col-2">
            <StickSidebar>
              <WidgetItem isShowTitle={true} title="Trending News">
                <TrendingWidget />
              </WidgetItem>
              <WidgetItem>
                {platformLoading && <Loading />}
                {platformError && <p>{platformError.message}</p>}
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
              <WidgetItem>
                <Link to="#" className="add">
                  <img src="/assets/img/add.jpg" alt="add" />
                </Link>
              </WidgetItem>
            </StickSidebar>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BlogSection
