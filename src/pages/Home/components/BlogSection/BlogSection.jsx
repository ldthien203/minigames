import Category from '../../../../components/Category/Category'
import IntroCard from '../../../../components/IntroCard/IntroCard'
import {Link} from 'react-router'
import './BlogSection.css'
import TrendingWidget from './components/TrendingWidget/TrendingWidget'

const BlogSection = () => {
  const itemInCategory = [
    'Games',
    'Gaming Tips & Tricks',
    'Online Games',
    'Team Games',
    'Community',
    'Uncategorized',
  ]

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
            <ul className="blog-filter">
              <li>
                <Link to="#">Racing</Link>
              </li>
              <li>
                <Link to="#">Shooters</Link>
              </li>
              <li>
                <Link to="#">Strategy</Link>
              </li>
              <li>
                <Link to="#">Online</Link>
              </li>
            </ul>
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
            <div id="stickSidebar">
              <div className="inner-wrapper-sticky">
                <div className="widget-item">
                  <h4 className="widget-title">Trending</h4>
                  <TrendingWidget />
                </div>
                <div className="widget-item">
                  <Category title="Categories" items={itemInCategory} />
                </div>
                <div className="widget-item">
                  <Link to="#" className="add">
                    <img
                      src={require('../../../../assets/img/add.jpg')}
                      alt="add"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BlogSection
