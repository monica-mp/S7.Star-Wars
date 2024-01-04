import { useState } from 'react'
import { useElements, type Starship } from '../../Context'
import defaultImage from '../assets/img/defaultStarship.png'
import PilotsList from '../Pilots/Pilots'
import FilmsList from '../Films/Films'

function Starships (): JSX.Element {
  const {
    starships,
    selectedStarship,
    setSelectedStarship,
    handleViewMore,
    currentPage
  } = useElements()

  const [showDetails, setShowDetails] = useState(false)

  const handleClick = (starship: Starship): void => {
    setSelectedStarship(starship)
    setShowDetails(true)
  }

  const handleBackToList = (): void => {
    setSelectedStarship(null)
    setShowDetails(false)
  }

  return (
    <div className='flex flex-col gap-4 w-3/5 mx-auto font-mono'>
      {showDetails && selectedStarship !== null
        ? (
        <>

          <div className='bg-neutral-900 p-4'>
            <div className='border-t-2 border-b-2 text-xl py-2 pl-2 text-white'>
              STARSHIP
            </div>
            <div className='flex gap-4'>
              <img
                src={selectedStarship.image}
                alt={selectedStarship.name}
                onError={(e) => {
                  e.currentTarget.src = defaultImage
                }}
              />
              <ul className='flex flex-col gap-2 py-4 text-xl px-2 '>
                <li className='text-white'>
                  Name: {selectedStarship.name.toUpperCase()}
                </li>
                <li>Model: {selectedStarship.model}</li>
                <li>Manufacturer: {selectedStarship.manufacturer}</li>
                <li>Cost: {selectedStarship.cost_in_credits} credits</li>
                <li>Length: {selectedStarship.length} m</li>
                <li>
                  Max speed: {selectedStarship.max_atmosphering_speed} km/h
                </li>
                <li>Crew: {selectedStarship.crew}</li>
                <li>Passengers: {selectedStarship.passengers}</li>
              </ul>

            </div>
            <PilotsList pilots={selectedStarship.pilots} />
            <FilmsList films={selectedStarship.films}/>
            <button
            className='btn btn-outline btn-sm w-24 mx-auto my-4'
            onClick={handleBackToList}
          >
            Back to List
          </button>
          </div>
        </>
          )
        : (
        <>
          {starships.map((starship: Starship, index: number) => (
            <div
              key={index}
              className='bg-neutral-900 p-4'
              onClick={() => { handleClick(starship) }}
            >
              <>
                <h1 className='text-2xl '>{starship.name.toUpperCase()}</h1>
                <p>{starship.model}</p>
              </>
            </div>
          ))}
          {currentPage !== 4 && (
            <button
              className='btn btn-outline btn-sm w-24 mx-auto my-4'
              onClick={handleViewMore}
            >
              View more
            </button>
          )}
        </>
          )}
    </div>
  )
}

export default Starships
