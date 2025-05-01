import {Link} from 'react-router-dom'
import IntroCard from '../../../../components/IntroCard/IntroCard'
import BlogFilter from '../../../../components/BlogFilter/BlogFilter'
import StickSidebar from '../../../../components/StickSidebar/StickSidebar'
import TrendingWidget from '../../../../components/TrendingWidget/TrendingWidget'
import Category from '../../../../components/Category/Category'
import WidgetItem from '../../../../components/WidgetItem/WidgetItem'
import useFetchData from '../../../../hooks/useFetchData'
import './BlogSection.css'
import add from '../../../../assets/img/add.jpg'

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
  const {data, loading, error} = useFetchData('http://localhost:4000/games')

  return (
    <section className="blog-section">
      <div className="container">
        <div className="row">
          <div className="col-1">
            <div className="section-title">
              <h2>Lastest News</h2>
            </div>
            <BlogFilter blogFilter={blogFilter} />
            {loading && <p>Loading games...</p>}
            {error && <p>{error}</p>}
            {data &&
              data.map(card => (
                <div key={card.game_id} className="blog-item">
                  <IntroCard
                    id={card.game_id}
                    title={card.name}
                    description={card.summary}
                    category={card.category_name}
                    img={card.thumbnail}
                    isShowImg={true}
                    rating={card.rating}
                    date={card.release_date}
                    categoryLink={`/${card.category_name.toLowerCase()}`}
                    readMoreLink={`/${card.category_name.toLowerCase()}/${
                      card.game_id
                    }`}
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
