import {Fragment} from 'react'
import IntroCard from '../../../../components/IntroCard/IntroCard'
import './ReviewSection.css'

const reviewItem = [
  {
    category: 'Games',
    title: 'Final Appocalipse',
    img: '../../assets/img/review/1.jpg',
    rating: 4.5,
  },
  {
    category: 'Games',
    title: 'Hounted Mansion 3',
    img: '../../assets/img/review/2.jpg',
    rating: 4.5,
  },
  {
    category: 'Games',
    title: 'Shooting Stuff',
    img: '../../assets/img/review/3.jpg',
    rating: 3.5,
  },
  {
    category: 'Games',
    title: 'Zombie War Nation 1',
    img: '../../assets/img/review/4.jpg',
    rating: 4.5,
  },
  {
    category: 'Games',
    title: "Jams'e Island 3",
    img: '../../assets/img/review/5.jpg',
    rating: 2.5,
  },
]

const ReviewSection = () => {
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
