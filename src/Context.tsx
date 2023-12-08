import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode
} from 'react'

export interface Starship {
  name: string
  model: string
}

interface ContextProps {
  starships: Starship[]

}

const Context = createContext<ContextProps | undefined>(undefined)

export const useElements = (): ContextProps => {
  const context = useContext(Context)
  if (context == null) {
    throw new Error('useElements must be used within a ContextProvider')
  }
  return context
}

interface ContextProviderProps {
  children: ReactNode
}

export const ContextProvider: React.FC<ContextProviderProps> = ({
  children
}) => {
  const [starships, setStarships] = useState<Starship[]>([])

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await fetch('https://swapi.dev/api/starships/')
        const data = await response.json()

        if (Array.isArray(data.results)) {
          setStarships(data.results)
        }
      } catch (error) {
        console.error('Error fetching starships:', error)
      }
    }

    void fetchData()
  }, [])

  const contextValue: ContextProps = {
    starships
  }

  return <Context.Provider value={contextValue}>{children}</Context.Provider>
}

export default ContextProvider
