import {Fragment} from 'react'
import IntroCard from '../../../../components/IntroCard/IntroCard'
import './ReviewSection.css'

const ReviewSection = () => {
  const reviewItem = [
    {
      category: 'Games',
      title: 'Final Appocalipse',
      img: 1,
      rating: 4.5,
    },
    {
      category: 'Games',
      title: 'Hounted Mansion 3',
      img: 4,
      rating: 4.5,
    },
    {
      category: 'Games',
      title: 'Shooting Stuff',
      img: 5,
      rating: 3.5,
    },
    {
      category: 'Games',
      title: 'Zombie War Nation 1',
      img: 2,
      rating: 4.5,
    },
    {
      category: 'Games',
      title: "Jams'e Island 3",
      img: 6,
      rating: 2.5,
    },
  ]

  return (
    <Fragment>
      <section className="review-section">
        <div className="container">
          {reviewItem.map(item => (
            <div className="review-item" key={item.title}>
              <IntroCard
                category={item.category}
                title={item.title}
                isShowImg={true}
                isShowRating={true}
                img={item.img}
                rating={item.rating}
              />
            </div>
          ))}
        </div>
      </section>
    </Fragment>
  )
}

export default ReviewSection
