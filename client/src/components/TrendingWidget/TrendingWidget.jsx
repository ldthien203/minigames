import MiniCard from './components/MiniCard/MiniCard'
import useFetchData from '../../hooks/useFetchData'
import './TrendingWidget.css'
import img from '../../assets/img/blog-widget/1.jpg'

const TrendingWidget = () => {
  const {data, loading, error} = useFetchData(
    'http://localhost:4000/news/trending?limit=4',
  )

  return (
    <div className="trending-widget">
      {loading && <p>Loading news...</p>}
      {error && <p>{error}</p>}
      {data &&
        data.map(news => (
          <MiniCard
            key={news.news_id}
            id={news.news_id}
            title={news.title}
            category={news.category_name}
            img={img}
          />
        ))}
    </div>
  )
}

export default TrendingWidget
