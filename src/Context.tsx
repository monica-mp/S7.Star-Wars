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
  manufacturer: string
  cost_in_credits: number
  length: number
  max_atmosphering_speed: number
  crew: number
  passengers: number

}

interface ContextProps {
  starships: Starship[]
  selectedStarship: Starship | null
  setSelectedStarship: (starship: Starship | null) => void
  handleSelectedStarship: (starship: Starship) => void
  handleViewMore: () => void
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
  const [currentPage, setCurrentPage] = useState<number>(1)

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await fetch(`https://swapi.dev/api/starships/?page=${currentPage}`)
        const data = await response.json()

        if (Array.isArray(data.results)) {
          setStarships((prevStarships) => {
            const uniqueStarships = data.results.filter((newStarship: { name: string }) =>
              prevStarships.every((prev) => prev.name !== newStarship.name)
            )
            return [...prevStarships, ...uniqueStarships]
          })
        }
      } catch (error) {
        console.error('Error fetching starships:', error)
      }
    }

    void fetchData()
  }, [currentPage])

  const handleViewMore = (): void => {
    setCurrentPage((prevPage) => prevPage + 1)
  }

  const [selectedStarship, setSelectedStarship] = useState<Starship | null>(null)

  const handleSelectedStarship = (starship: Starship): void => {
    setSelectedStarship(starship)
  }

  const contextValue: ContextProps = {
    starships,
    selectedStarship,
    setSelectedStarship,
    handleSelectedStarship,
    handleViewMore
  }

  return <Context.Provider value={contextValue}>{children}</Context.Provider>
}

export default ContextProvider
