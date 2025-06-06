import MiniCard from './components/MiniCard/MiniCard'
import useFetchData from '../../hooks/useFetchData'
import Loading from '../Loading/Loading'
import './TrendingWidget.css'

const TrendingWidget = () => {
  const {data, loading, error} = useFetchData(
    `${process.env.REACT_APP_API_URL}/news/trending?limit=4`,
  )

  return (
    <div className="trending-widget">
      {loading && <Loading />}
      {error && <p>{error}</p>}
      {data &&
        data.map(news => (
          <MiniCard
            key={news.news_id}
            id={news.news_id}
            title={news.title}
            category={news.category_name}
            date={news.publish_date}
            viewCount={news.view_count}
            img="/assets/img/blog-widget/1.jpg"
          />
        ))}
    </div>
  )
}

export default TrendingWidget
