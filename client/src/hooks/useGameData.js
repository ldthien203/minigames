import {createContext, useContext, useEffect, useState} from 'react'

const GameData = createContext([])

const useGameData = () => {
  return useContext(GameData)
}

export const GameDataProvider = ({children}) => {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/games')
        const data = await response.json()
        setData(data)
      } catch (error) {
        console.log(`Error: ${error.message}`)
      }
    }

    fetchData()
  }, [])

  return <GameData.Provider value={data}>{children}</GameData.Provider>
}

export default useGameData
