import { type FilmsListProps } from '../../Context'

const FilmsList: React.FC<FilmsListProps> = ({ films }) => {
  return (
    <>
    {films.length > 0 && (
        <div className='bg-neutral-900 p-4'>
            <div className='border-t-2 border-b-2 text-xl py-2 pl-2 text-white'>
              FILMS
            </div>

          <ul className='flex flex-col gap-2 py-4 text-xl px-2'>
            {films.map((film, index) => (
              <li key={index}>{film}</li>
            ))}
          </ul>
        </div>
    )}
    </>
  )
}

export default FilmsList
