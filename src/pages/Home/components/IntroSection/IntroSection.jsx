import './IntroSection.css'
import IntroCard from '../../../../components/IntroCard/IntroCard'

const IntroSection = () => {
  return (
    <section className="intro-section">
      <div className="container">
        <div className="row">
          <div className="col">
            <IntroCard
              category="Game"
              title="The best online game is out now!"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida...."
            />
          </div>
          <div className="col">
            <IntroCard
              category="Playstation"
              title="Top 5 best games in november"
              description="Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum labore suspendisse ultrices gravida...."
            />
          </div>
          <div className="col">
            <IntroCard
              category="Reviews"
              title="Get this game at a promo price"
              description="Sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida ncididunt ut labore ...."
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default IntroSection
