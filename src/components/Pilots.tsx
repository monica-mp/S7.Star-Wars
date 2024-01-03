import { type PilotsListProps } from '../Context'

const PilotsList: React.FC<PilotsListProps> = ({ pilots }) => {
  return (
    <>
      {pilots.length > 0 && (

        <div className='bg-neutral-900 p-4'>
            <div className='border-t-2 border-b-2 text-xl py-2 pl-2 text-white'>
              PILOTS
            </div>

          <ul className='flex flex-col gap-2 py-4 text-xl px-2'>
            {pilots.map((pilot, index) => (
              <li key={index}>{pilot}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

export default PilotsList
