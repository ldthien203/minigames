import MiniCard from './components/MiniCard/MiniCard'
import './TrendingWidget.css'

const trendingItems = [
  {
    id: 1,
    title: 'The best online game is out now!',
    category: 'Games',
    img: '../../../../assets/img/blog-widget/1.jpg',
  },
  {
    id: 2,
    title: 'The best online game is out now!',
    category: 'Games',
    img: '../../../../assets/img/blog-widget/2.jpg',
  },
  {
    id: 3,
    title: 'The best online game is out now!',
    category: 'Games',
    img: '../../../../assets/img/blog-widget/3.jpg',
  },
  {
    id: 4,
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
          key={item.id}
          title={item.title}
          category={item.category}
          img={item.img}
        />
      ))}
    </div>
  )
}

export default TrendingWidget
