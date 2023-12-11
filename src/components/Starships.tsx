import { useElements, type Starship } from '../Context'

function Starships (): JSX.Element {
  const { starships, selectedStarship, setSelectedStarship, handleSelectedStarship, handleViewMore } = useElements()

  return (
    <>
    <div className='flex flex-col gap-4'>
    {starships.map((starship: Starship) => (
      <div
        key={starship.name}
        className='border-2'
        onClick={() => { handleSelectedStarship(starship) }}
      >
        <h1 className="text-2xl">{starship.name}</h1>
        <p>{starship.model}</p>
      </div>
    ))}

    {(selectedStarship != null) && (
      <div className='border-2'>
        <button onClick={() => { setSelectedStarship(null) }}>Close</button>
        <ul>
          <li>Name: {selectedStarship.name}</li>
          <li>Model: {selectedStarship.model}</li>
          <li>Manufacturer: {selectedStarship.manufacturer}</li>
          <li>Cost in credits: {selectedStarship.cost_in_credits}</li>
          <li>Length: {selectedStarship.length}</li>
          <li>Max speed: {selectedStarship.max_atmosphering_speed}</li>
          <li>Crew: {selectedStarship.crew}</li>
          <li>Passengers: {selectedStarship.passengers}</li>
        </ul>
      </div>
    )}
  </div>
  <button onClick={handleViewMore}>View more</button>
    </>

  )
}

export default Starships
