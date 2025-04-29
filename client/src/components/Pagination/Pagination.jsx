import {usePagination, DOTS} from '../../hooks/usePagination'
import './Pagination.css'

const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize = 3,
}) => {
  const paginationRange = usePagination({
    totalCount,
    pageSize,
    siblingCount,
    currentPage,
  })

  if (currentPage === 0 || paginationRange < 2) return null

  const onNext = () => {
    if (currentPage === lastPage) return
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    if (currentPage === 1) return
    onPageChange(currentPage - 1)
  }

  let lastPage = paginationRange[paginationRange.length - 1]
  return (
    <div className="site-pagination">
      <ul className="pagination-container">
        <li className="pagination-item" onClick={onPrevious}>
          {'<'}
        </li>
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return (
              <li key={`dots-${index}`} className="pagination-item dots">
                &#8230
              </li>
            )
          }

          return (
            <li
              key={pageNumber}
              className={`pagination-item ${
                pageNumber === currentPage && 'selected'
              }`}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </li>
          )
        })}
        <li className="pagination-item" onClick={onNext}>
          {'>'}
        </li>
      </ul>
    </div>
  )
}

export default Pagination
