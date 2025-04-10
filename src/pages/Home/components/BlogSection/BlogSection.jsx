import IntroCard from '../../../../components/IntroCard/IntroCard'
import BlogFilter from '../../../../components/BlogFilter/BlogFilter'
import './BlogSection.css'
import StickSidebar from '../../../../components/StickSidebar/StickSidebar'

const BlogSection = () => {
  const listIntroCard = [
    {
      category: 'Games',
      title: 'The best online game is out now!',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eius-mod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Lorem ipsum dolor sit amet, consecte-tur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.....',
      img: 1,
    },
    {
      category: 'Games',
      title: 'The best online game is out now!',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eius-mod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Lorem ipsum dolor sit amet, consecte-tur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.....',
      img: 2,
    },
    {
      category: 'Games',
      title: 'The best online game is out now!',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eius-mod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Lorem ipsum dolor sit amet, consecte-tur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.....',
      img: 3,
    },
  ]

  return (
    <section className="blog-section">
      <div className="container">
        <div className="row">
          <div className="col-1">
            <div className="section-title">
              <h2>Lastest News</h2>
            </div>
            <BlogFilter />
            {listIntroCard.map(card => (
              <div key={card.img} className="blog-item">
                <IntroCard
                  category={card.category}
                  title={card.title}
                  description={card.description}
                  isShowImg={true}
                  img={card.img}
                />
              </div>
            ))}
          </div>
          <div className="col-2">
            <StickSidebar />
          </div>
        </div>
      </div>
    </section>
  )
}

export default BlogSection
