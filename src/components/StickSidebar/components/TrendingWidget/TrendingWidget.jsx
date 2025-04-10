import './TrendingWidget.css'
import MiniCard from '../MiniCard/MiniCard'

const trendingItems = [
  {
    title: 'The best online game is out now!',
    category: 'Games',
    img: '../../../../assets/img/blog-widget/1.jpg',
  },
  {
    title: 'The best online game is out now!',
    category: 'Games',
    img: '../../../../assets/img/blog-widget/2.jpg',
  },
  {
    title: 'The best online game is out now!',
    category: 'Games',
    img: '../../../../assets/img/blog-widget/3.jpg',
  },
  {
    title: 'The best online game is out now!',
    category: 'Games',
    img: '../../../../assets/img/blog-widget/4.jpg',
  },
]

const TrendingWidget = () => {
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
