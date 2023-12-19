import { Routes, Route, BrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../components/Home/Home'
import Signup from '../components/Signup'
import Login from '../components/Login'
import ProtectedRoute from '../utils/ProtectedRoute'
import { useElements } from '../Context'

export function Rutes (): JSX.Element {
  const { isUserLoggedIn } = useElements()
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoute canActivate={isUserLoggedIn} redirectPath='/login'/>}>
          <Route path="/app" element={<App />} />
        </Route>

        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}
