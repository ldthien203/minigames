import {useEffect} from 'react'

const useFetchData = (url, setter, errorMsg) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url)
        const data = await response.json()
        setter(data)
      } catch (error) {
        console.error(errorMsg, error)
      }
    }

    fetchData()
  }, [errorMsg, setter, url])
}

export default useFetchData
