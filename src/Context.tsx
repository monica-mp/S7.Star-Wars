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
  image: string

}

interface ContextProps {
  starships: Starship[]
  selectedStarship: Starship | null
  setSelectedStarship: (starship: Starship | null) => void
  handleViewMore: () => void
  currentPage: number
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
  const [selectedStarship, setSelectedStarship] = useState<Starship | null>(null)

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await fetch(`https://swapi.dev/api/starships/?page=${currentPage}`)
        const data = await response.json()

        if (Array.isArray(data.results)) {
          setStarships((prevStarships) => {
            const newStarships = data.results.map((newStarship: { url: string }) => {
              // Obtener el número de la nave desde la URL
              const shipNumber = newStarship.url.split('/').filter(Boolean).pop()

              // Crear la URL de la imagen
              const imageUrl = `https://starwars-visualguide.com/assets/img/starships/${shipNumber}.jpg`

              return {
                ...newStarship,
                image: imageUrl
              }
            })

            // Convinar i esborrar duplicats basant-se en el nou de la nau
            const updatedStarships = [...new Set([...prevStarships, ...newStarships].map(starship => starship.name))]
              .map(name => [...prevStarships, ...newStarships].find(starship => starship.name === name))

            return updatedStarships
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

  const contextValue: ContextProps = {
    starships,
    selectedStarship,
    setSelectedStarship,
    handleViewMore,
    currentPage
  }

  return <Context.Provider value={contextValue}>{children}</Context.Provider>
}

export default ContextProvider
