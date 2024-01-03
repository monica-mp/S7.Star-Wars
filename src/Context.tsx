import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode
} from 'react'

// Definition of the interface for starship
export interface Starship {
  name: string
  model: string
  manufacturer: string
  cost_in_credits: number
  length: number
  max_atmosphering_speed: number
  crew: number
  passengers: number
  image: string
  pilots: string[]
}
export interface PilotsListProps {
  pilots: string[]
}

// Definition of the properties of the context
interface ContextProps {
  starships: Starship[]
  selectedStarship: Starship | null
  setSelectedStarship: (starship: Starship | null) => void
  handleViewMore: () => void
  currentPage: number
  isLoggedIn: boolean
  setIsLoggedIn: (isLoggedIn: boolean) => void
  isUserLoggedIn: boolean
  setIsUserLoggedIn: (isUserLoggedIn: boolean) => void
}

// Creation of the context
const Context = createContext<ContextProps | undefined>(undefined)

// Custom hook to consume the context
export const useElements: () => ContextProps = (): ContextProps => {
  const context = useContext(Context)
  if (context == null) {
    throw new Error('useElements must be used within a ContextProvider')
  }
  return context
}

// Properties of the context provider
interface ContextProviderProps {
  children: ReactNode
}

// Component of the context provider
export const ContextProvider: React.FC<ContextProviderProps> = ({
  children
}) => {
  // States of the application
  const [starships, setStarships] = useState<Starship[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [selectedStarship, setSelectedStarship] = useState<Starship | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false)

  useEffect(() => {
    const fetchPilots = async (urls: string[]): Promise<string[]> => {
      try {
        const pilotsPromises = urls.map(async (url: string) => {
          const response = await fetch(url)
          const data = await response.json()
          return data.name
        })

        const pilots = await Promise.all(pilotsPromises)
        return pilots
      } catch (error) {
        console.error('Error fetching pilots:', error)
        return []
      }
    }
    const fetchData = async (): Promise<void> => {
      try {
        const response = await fetch(`https://swapi.dev/api/starships/?page=${currentPage}`)
        const data = await response.json()

        if (Array.isArray(data.results)) {
          const newStarships = await Promise.all(data.results.map(async (newStarship: { url: string, pilots: string[] }) => {
            const shipNumber = newStarship.url.split('/').filter(Boolean).pop()
            const imageUrl = `https://starwars-visualguide.com/assets/img/starships/${shipNumber}.jpg`

            // Fetch pilots for the current starship
            const pilots = await fetchPilots(newStarship.pilots)

            return {
              ...newStarship,
              image: imageUrl,
              pilots // Add the pilots array to the starship object
            }
          }))

          const updatedStarships = [
            ...new Set([...starships, ...newStarships].map(starship => starship.name))
          ].map(name => [...starships, ...newStarships].find(starship => starship.name === name))

          setStarships(updatedStarships)
        }
      } catch (error) {
        console.error('Error fetching starships:', error)
      }
    }

    void fetchData()
  }, [currentPage, starships])

  // Load more data (pages) of starships
  const handleViewMore = (): void => {
    setCurrentPage((prevPage) => prevPage + 1)
  }

  // Value of the context provided through the provider
  const contextValue: ContextProps = {
    starships,
    selectedStarship,
    setSelectedStarship,
    handleViewMore,
    currentPage,
    isLoggedIn,
    setIsLoggedIn,
    isUserLoggedIn,
    setIsUserLoggedIn
  }

  // Rendering of the context provider with the context value
  return <Context.Provider value={contextValue}>{children}</Context.Provider>
}

export default ContextProvider
