import {Link} from 'react-router'
import './BlogFilter.css'

const BlogFilter = ({
  filters = [],
  queryKey = '',
  labelKey = 'short_name',
  idKey = 'id',
}) => {
  return (
    <ul className="blog-filter">
      {filters.map(filter => {
        const query = `${queryKey}=${encodeURIComponent(filter[labelKey])}`
        return (
          <li key={filter[idKey]}>
            <Link to={`?${query}`}>{filter[labelKey]}</Link>
          </li>
        )
      })}
    </ul>
  )
}

export default BlogFilter
