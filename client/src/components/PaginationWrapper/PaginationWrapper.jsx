import {useMemo} from 'react'
import Pagination from '../Pagination/Pagination'

const PaginationWrapper = ({
  data,
  currentPage,
  setCurrentPage,
  pageSize = 3,
  children,
}) => {
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize
    const lastPageIndex = firstPageIndex + pageSize
    return data.slice(firstPageIndex, lastPageIndex)
  }, [currentPage, data, pageSize])

  return (
    <>
      {children(currentTableData)}
      <Pagination
        currentPage={currentPage}
        totalCount={data.length}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
      />
    </>
  )
}

export default PaginationWrapper
