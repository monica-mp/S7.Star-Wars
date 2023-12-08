import { useElements, type Starship } from '../Context'

function Starships (): JSX.Element {
  const { starships } = useElements()

  return (
    <div className='flex flex-col gap-4'>
    {starships.map((starship: Starship) => (
      <div
        key={starship.name}
        className='border-2'

      >
        <h1 className="text-2xl">{starship.name}</h1>
        <p>{starship.model}</p>
      </div>
    ))}
  </div>
  )
}

export default Starships
