import {Link} from 'react-router-dom'
import IntroCard from '../../../../components/IntroCard/IntroCard'
import BlogFilter from '../../../../components/BlogFilter/BlogFilter'
import StickSidebar from '../../../../components/StickSidebar/StickSidebar'
import TrendingWidget from '../../../../components/TrendingWidget/TrendingWidget'
import Category from '../../../../components/Category/Category'
import WidgetItem from '../../../../components/WidgetItem/WidgetItem'
import './BlogSection.css'
import add from '../../../../assets/img/add.jpg'

const listIntroCard = [
  {
    category: 'Games',
    title: 'The best online game is out now!',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eius-mod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Lorem ipsum dolor sit amet, consecte-tur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.....',
    img: '../../assets/img/blog/1.jpg',
  },
  {
    category: 'Games',
    title: 'The best online game is out now!',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eius-mod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Lorem ipsum dolor sit amet, consecte-tur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.....',
    img: '../../assets/img/blog/2.jpg',
  },
  {
    category: 'Games',
    title: 'The best online game is out now!',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eius-mod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Lorem ipsum dolor sit amet, consecte-tur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.....',
    img: '../../assets/img/blog/3.jpg',
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
  return (
    <section className="blog-section">
      <div className="container">
        <div className="row">
          <div className="col-1">
            <div className="section-title">
              <h2>Lastest News</h2>
            </div>
            <BlogFilter blogFilter={blogFilter} />
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
