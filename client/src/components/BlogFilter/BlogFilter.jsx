import {Link} from 'react-router'
import './BlogFilter.css'

const BlogFilter = ({filters = [], queryKey = ''}) => {
  return (
    <ul className="blog-filter">
      {filters.map(filter => {
        const query = `${queryKey}=${encodeURIComponent(filter.short_name)}`
        return (
          <li key={filter.id}>
            <Link to={`?${query}`}>{filter.short_name}</Link>
          </li>
        )
      })}
    </ul>
  )
}

export default BlogFilter
