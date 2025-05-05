import {useMemo, useState} from 'react'
import Pagination from '../Pagination/Pagination'

const PaginationWrapper = ({data, pageSize = 3, children}) => {
  const [currentPage, setCurrentPage] = useState(1)

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize
    const lastPageIndex = firstPageIndex + pageSize
    return data.slice(firstPageIndex, lastPageIndex)
  }, [currentPage, data, pageSize])

  return (
    <>
      {children(currentTableData)}
      <Pagination
        totalCount={data.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </>
  )
}

export default PaginationWrapper
