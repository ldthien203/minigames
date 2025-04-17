import './IntroSection.css'
import IntroCard from '../../../../components/IntroCard/IntroCard'

const introCard = [
  {
    id: 1,
    category: 'Games',
    title: 'The best online game is out now!',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida....',
  },
  {
    id: 2,
    category: 'Playstation',
    title: 'Top 5 best games in november',
    description:
      'Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum labore suspendisse ultrices gravida....',
  },
  {
    id: 3,
    category: 'Reviews',
    title: 'Get this game at a promo price',
    description:
      'Sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida ncididunt ut labore ....',
  },
]

const IntroSection = () => {
  return (
    <section className="intro-section">
      <div className="container">
        <div className="row">
          {introCard.map(card => (
            <div key={card.id} className="col">
              <IntroCard title={card.title} description={card.description} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default IntroSection
