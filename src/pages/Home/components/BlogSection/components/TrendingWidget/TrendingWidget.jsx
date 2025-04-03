import './TrendingWidget.css'
import MiniCard from '../MiniCard/MiniCard'

const TrendingWidget = () => {
  const trendingItems = [
    {title: 'The best online game is out now!', category: 'Games', img: 1},
    {title: 'The best online game is out now!', category: 'Games', img: 2},
    {title: 'The best online game is out now!', category: 'Games', img: 3},
    {title: 'The best online game is out now!', category: 'Games', img: 4},
  ]

  return (
    <div className="trending-widget">
      {trendingItems.map(item => (
        <MiniCard
          key={item.title}
          title={item.title}
          category={item.category}
          img={item.img}
        />
      ))}
    </div>
  )
}

export default TrendingWidget
