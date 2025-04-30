import './IntroSection.css'
import IntroCard from '../../../../components/IntroCard/IntroCard'

const introCard = [
  {
    id: 1,
    category: 'Games',
    title: 'The best online game is out now!',
    description:
      "Discover the latest in gaming with trending titles, must-play releases, and exciting updates from the world of video games. Whether you''re into strategy, action, or immersive open-world adventures, our Games section brings you in-depth insights, fresh reviews, and all the news you need to stay ahead in the gaming scene.",
  },
  {
    id: 2,
    category: 'Reviews',
    title: 'Top 5 highest rating games in 2025',
    description:
      "2025 has been a groundbreaking year for gamers, with titles pushing the limits of storytelling, graphics, and gameplay. In this article, we rank the top 5 highest-rated games based on critic reviews, player feedback, and overall impact. Whether you're looking for a game to sink hours into or just want to see what's leading the charts, this list has something for every type of player.",
  },
  {
    id: 3,
    category: 'News',
    title: 'More news about Update, DLC',
    description:
      'Stay up to date with the latest game updates, expansions, and downloadable content (DLCs) that keep your favorite titles fresh and exciting. From new story chapters and character packs to performance patches and seasonal events, we bring you all the essential news to enhance your gameplay experience and keep you ahead of the curve.',
  },
]

const IntroSection = () => {
  return (
    <section className="intro-section">
      <div className="container">
        <div className="row">
          {introCard.map(card => (
            <div key={card.id} className="col">
              <IntroCard
                category={card.category}
                title={card.title}
                description={card.description}
                categoryLink={`/${card.category.toLowerCase()}`}
                readMoreLink={`/${card.category.toLowerCase()}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default IntroSection
