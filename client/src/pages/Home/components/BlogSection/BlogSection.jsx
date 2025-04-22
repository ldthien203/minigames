import {Link} from 'react-router-dom'
import IntroCard from '../../../../components/IntroCard/IntroCard'
import BlogFilter from '../../../../components/BlogFilter/BlogFilter'
import StickSidebar from '../../../../components/StickSidebar/StickSidebar'
import TrendingWidget from '../../../../components/TrendingWidget/TrendingWidget'
import Category from '../../../../components/Category/Category'
import WidgetItem from '../../../../components/WidgetItem/WidgetItem'
import './BlogSection.css'
import add from '../../../../assets/img/add.jpg'
import useGameData from '../../../../hooks/useGameData'

const introCard = [
  {
    id: 1,
    title: 'Zombie Appocalipse 2',
    image: '../../../../assets/img/games/1.jpg',
    link: '#',
  },
  {title: 'Dooms Day', image: '../../../../assets/img/games/2.jpg', link: '#'},
  {
    id: 2,
    title: 'The Huricane',
    image: '../../../../assets/img/games/3.jpg',
    link: '#',
  },
  {
    id: 3,
    title: 'Star Wars',
    image: '../../../../assets/img/games/4.jpg',
    link: '#',
  },
  {
    id: 4,
    title: 'Candyy Land',
    image: '../../../../assets/img/games/5.jpg',
    link: '#',
  },
  {
    id: 5,
    title: 'E.T.',
    image: '../../../../assets/img/games/6.jpg',
    link: '#',
  },
  {
    id: 6,
    title: 'Zombie Appocalipse 2',
    image: '../../../../assets/img/games/7.jpg',
    link: '#',
  },
  {
    id: 7,
    title: 'Dooms Day',
    image: '../../../../assets/img/games/8.jpg',
    link: '#',
  },
  {
    id: 8,
    title: 'The Huricane',
    image: '../../../../assets/img/games/9.jpg',
    link: '#',
  },
]

const itemInCategory = [
  'Games',
  'Gaming Tips & Tricks',
  'Online Games',
  'Team Games',
  'Community',
  'Uncategorized',
]

const blogFilter = [
  {id: 1, link: '#', name: 'Racing'},
  {id: 2, link: '#', name: 'Shooters'},
  {id: 3, link: '#', name: 'Strategy'},
  {id: 4, link: '#', name: 'Online'},
]

const BlogSection = () => {
  const data = useGameData()

  return (
    <section className="blog-section">
      <div className="container">
        <div className="row">
          <div className="col-1">
            <div className="section-title">
              <h2>Lastest News</h2>
            </div>
            <BlogFilter blogFilter={blogFilter} />
            {data &&
              data.map(card => (
                <div key={card.game_id} className="blog-item">
                  <IntroCard
                    id={card.game_id}
                    title={card.name}
                    description={card.summary}
                    img={card.image}
                    isShowImg={true}
                    rating={card.rating}
                    date={card.release_date}
                  />
                </div>
              ))}
          </div>
          <div className="col-2">
            <StickSidebar>
              <WidgetItem isShowTitle={true} title="Trending">
                <TrendingWidget />
              </WidgetItem>
              <WidgetItem>
                <Category title="Categories" items={itemInCategory} />
              </WidgetItem>
              <WidgetItem>
                <Link to="#" className="add">
                  <img src={add} alt="add" />
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
