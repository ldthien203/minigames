import {createContext, useContext, useState} from 'react'
import useFetchData from './useFetchData'

const GameData = createContext([])

const useGameData = () => {
  return useContext(GameData)
}

export const GameDataProvider = ({children}) => {
  const [data, setData] = useState([])

  useFetchData('http://localhost:4000/games', setData, 'Error fetching games')

  return <GameData.Provider value={data}>{children}</GameData.Provider>
}

export default useGameData
