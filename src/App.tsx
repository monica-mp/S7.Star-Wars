import './App.css'
import Header from './components/Header'
import Starships from './components/Starships'

function App (): JSX.Element {
  return (
  <div className="bg-black">
    <Header />
    <Starships />
  </div>

  )
}

export default App
