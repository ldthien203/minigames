import {useEffect, useMemo, useState} from 'react'
import Cookies from 'js-cookie'

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
    if (!url) return

    const controller = new AbortController()

    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        const queryString = new URLSearchParams(stableQueryParams).toString()
        const fullUrl = queryString ? `${url}?${queryString}` : url

        const token = Cookies.get('token')
        const response = await fetch(fullUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
        })

        if (!response.ok) {
          Cookies.remove('token')
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result = await response.json()
        setData(result)
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error(errorMsg, error)
          setError(error.message)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    return () => {
      controller.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, errorMsg, JSON.stringify(stableQueryParams)])

  return {data, loading, error, setData, setLoading, setError}
}

export default useFetchData
