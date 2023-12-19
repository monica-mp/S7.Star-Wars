import { Link } from 'react-router-dom'
import { useElements } from '../Context'

const Navbar = (): JSX.Element => {
  const { isLoggedIn, setIsUserLoggedIn } = useElements()
  return (
    <>
      <div className="flex py-6 px-6" >
        <div className="flex self-start items-center gap-4">
          <a href="#" className="w-4"><img src="./src/assets/img/twitter.png" alt="Icon 1" /></a>
          <a href="#" className="w-4"><img src="./src/assets/img/yt.png" alt="Icon 2" /></a>
          <a href="#" className="w-4"><img src="./src/assets/img/instagram.png" alt="Icon 3" /></a>
          <a href="#" className="w-4"><img src="./src/assets/img/tiktok.png" alt="Icon 4" /></a>
          <a href="#" className="w-4"><img src="./src/assets/img/facebook.png" alt="Icon 5" /></a>
        </div>
        <img src="../src/assets/img/logo.png" className="mx-auto w-80" alt="Logo" />
        <div className="flex self-start text-xl text-white font-mono">
        {isLoggedIn
          ? (
            <>
              <Link to="/">
                <button className="p-2" onClick={() => { setIsUserLoggedIn(false) }}>LOG OUT</button>
              </Link>
            </>
            )
          : (
            <>
              <Link to="/login">
                <button className="border-r-2 pr-2">LOG IN</button>
              </Link>
              <Link to="/signup">
                <button className="pl-2">SIGN UP</button>
              </Link>
            </>
            )}
        </div>
      </div>

      <div className="flex justify-center items-center mb-2 gap-6 border-t-2 border-b-2 border-neutral-800">
      <Link to="/">
        <a className="text-xl text-white font-mono border-r-2 border-l-2 border-neutral-800 px-6 py-3">HOME</a>
      </Link>
        <a className="text-xl text-white font-mono border-r-2 border-neutral-800 pr-6 py-2">STARSHIPS</a>
      </div>

    </>

  )
}

export default Navbar
