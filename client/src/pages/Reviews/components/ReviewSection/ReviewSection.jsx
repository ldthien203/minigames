import {Fragment} from 'react'
import IntroCard from '../../../../components/IntroCard/IntroCard'
import './ReviewSection.css'
import useGameData from '../../../../hooks/useGameData'

const ReviewSection = () => {
  const data = useGameData()

  return (
    <Fragment>
      <section className="review-section">
        <div className="container">
          {data.map(card => (
            <div className="review-item" key={card.id}>
              <IntroCard
                date={card.release_date}
                id={card.game_id}
                title={card.name}
                description={card.summary}
                isShowImg={true}
                isShowRating={true}
                img={card.thumbnail}
                rating={card.avg_rating}
              />
            </div>
          ))}
        </div>
      </section>
    </Fragment>
  )
}

export default ReviewSection
