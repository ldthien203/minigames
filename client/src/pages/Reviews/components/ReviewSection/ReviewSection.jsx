import {Fragment, useMemo} from 'react'
import {useSearchParams} from 'react-router-dom'
import useFetchData from '../../../../hooks/useFetchData'
import IntroCard from '../../../../components/IntroCard/IntroCard'
import PaginationWrapper from '../../../../components/PaginationWrapper/PaginationWrapper'
import Loading from '../../../../components/Loading/Loading'
import './ReviewSection.css'

const ReviewSection = () => {
  const [searchParams] = useSearchParams()
  const selectedSort = searchParams.get('sort') || null
  const selectedOrder = searchParams.get('order') || null

  const params = useMemo(
    () => ({sort: selectedSort, order: selectedOrder}),
    [selectedOrder, selectedSort],
  )

  const {
    data: reviews,
    loading,
    error,
  } = useFetchData(`${process.env.REACT_APP_API_URL}/games`, params)

  return (
    <Fragment>
      <section className="review-section">
        <div className="container">
          {loading && <Loading />}
          {error && <p>{error}</p>}
          {reviews && (
            <PaginationWrapper data={reviews} pageSize={8}>
              {currentTable =>
                currentTable.map(card => (
                  <div className="review-item" key={card.game_id}>
                    <IntroCard
                      key={card.game_id}
                      date={card.release_date}
                      id={card.game_id}
                      title={card.name}
                      category={card.category_name}
                      description={card.summary}
                      isShowImg={true}
                      isShowRating={true}
                      img={card.thumbnail}
                      rating={card.avg_rating}
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
      </section>
    </Fragment>
  )
}

export default ReviewSection
