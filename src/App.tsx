import './App.css'
import ContextProvider from './Context'
import Header from './components/Header'
import Starships from './components/Starships'

function App (): JSX.Element {
  return (
    <ContextProvider>
      <Header />
      <Starships />
    </ContextProvider>

  )
}

export default App
