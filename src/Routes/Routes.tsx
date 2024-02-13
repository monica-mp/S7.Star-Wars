import { Routes, Route, BrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../components/Home/Home'
import Signup from '../components/Signup/Signup'
import Login from '../components/Login/Login'

export function Rutes (): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app" element={<App />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}
