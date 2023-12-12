const Navbar = (): JSX.Element => {
  return (
    <>
      <div className="flex py-6 px-6" >
        <div className="flex self-start items-center gap-4">
          <a href="#" className="w-4"><img src="./src/assets/img/twitter.png" alt="Icon 1" /></a>
          <a href="#" className="w-4"><img src="./src/assets/img/yt.png" alt="Icon 2" /></a>
          <a href="#" className="w-4"><img src="./src/assets/img/instagram.png" alt="Icon 3" /></a>
          <a href="#" className="w-4"><img src="./src/assets/img/tiktok.png" alt="Icon 4" /></a>
        </div>
        <img src="../src/assets/img/logo.png" className="mx-auto w-80" />
        <div className="flex self-start text-xl text-white font-mono">
          <button className="border-r-2 pr-2">LOG IN</button>
          <button className="pl-2">SIGN UP</button>

        </div>
      </div>
      <div className="flex justify-center mb-2 gap-6 border-t-2 border-b-2 border-neutral-800">
        <a className="text-xl text-white font-mono border-x-2 border-neutral-800 px-6 cursor-pointer py-2">HOME</a>
        <a className="text-xl text-white font-mono border-r-2 border-neutral-800 pr-6 cursor-pointer py-2">STARSHIPS</a>
      </div>

    </>

  )
}

export default Navbar
