import { Link } from 'react-router-dom'
import jediImage from '../../assets/img/jedi.jpg'
import empireImage from '../../assets/img/empire.jpg'
import starWarsImage from '../../assets/img/star-wars.jpg'

function Home (): JSX.Element {
  return (
    <>
    <main className="flex flex-col">

        <div className="carousel h-3/4 mb-6">
            <div id="slide1" className="carousel-item relative w-full">
                <img src={starWarsImage} className="w-full" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide4" className="btn btn-circle">❮</a>
                <a href="#slide2" className="btn btn-circle">❯</a>
                </div>
            </div>
            <div id="slide2" className="carousel-item relative w-full">
                <img src={jediImage} className="w-full" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide1" className="btn btn-circle">❮</a>
                <a href="#slide3" className="btn btn-circle">❯</a>
                </div>
            </div>
            <div id="slide3" className="carousel-item relative w-full">
                <img src={empireImage} className="w-full" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide2" className="btn btn-circle">❮</a>
                <a href="#slide4" className="btn btn-circle">❯</a>
                </div>
            </div>
        </div>
        <div className="hero min-h-screen ">
            <h1 className="text-3xl font-bold font-font2 text-yellow-300">A LONG TIME AGO IN A GALAXY FAR, FAR AWAY...</h1>
        </div>
        <Link to="/app" className="mx-auto">
            <button className='btn btn-outline font-mono'>
            See Starships
            <img src="./src/assets/img/nave-espacial.png" className='w-6'/>
            </button>
        </Link>

    </main>

    </>

  )
}

export default Home
