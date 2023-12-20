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
    // Asyncs function to fetch starship data
    const fetchData = async (): Promise<void> => {
      try {
        // Request to the StarWars API to get starships
        const response = await fetch(`https://swapi.dev/api/starships/?page=${currentPage}`)
        const data = await response.json()

        // Check if the API results are an array
        if (Array.isArray(data.results)) {
          // Update the state of starships using the previous state (prevStarships)
          setStarships((prevStarships) => {
            // Map the API results to add the image URL
            const newStarships = data.results.map((newStarship: { url: string }) => {
              // Get the starship number from the URL to construct the image URL
              const shipNumber = newStarship.url.split('/').filter(Boolean).pop()
              const imageUrl = `https://starwars-visualguide.com/assets/img/starships/${shipNumber}.jpg`

              // Return a new starship object that includes the image URL
              return {
                ...newStarship,
                image: imageUrl
              }
            })

            // Remove duplicates based on the starship name and maintain the original order
            const updatedStarships = [...new Set([...prevStarships, ...newStarships].map(starship => starship.name))]
              .map(name => [...prevStarships, ...newStarships].find(starship => starship.name === name))

            return updatedStarships
          })
        }
      } catch (error) {
        console.error('Error fetching starships:', error)
      }
    }

    // Call fetchData function to get and update data when the current page changes
    void fetchData()
  }, [currentPage]) // This effect runs when the page changes

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
