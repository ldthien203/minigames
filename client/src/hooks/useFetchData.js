import {useEffect, useMemo, useState} from 'react'

const useFetchData = (
  url,
  queryParams = {},
  errorMsg = 'Error fetching data',
) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState(null)

  const stableQueryParams = useMemo(() => {
    return Object.fromEntries(
      Object.entries(queryParams).filter(([_, value]) => value !== null),
    )
  }, [queryParams])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        const queryString = new URLSearchParams(stableQueryParams).toString()
        const fullUrl = queryString ? `${url}?${queryString}` : url

        const response = await fetch(fullUrl)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result = await response.json()
        setData(result)
      } catch (error) {
        console.error(errorMsg, error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, errorMsg, JSON.stringify(stableQueryParams)])

  return {data, loading, error, setData, setLoading, setError}
}

export default useFetchData
