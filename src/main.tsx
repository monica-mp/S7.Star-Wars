import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from './App'
import Home from './components/Home/Home'
import Signup from './components/Signup'
import Login from './components/Login'
import ContextProvider from './Context'

createRoot(document.getElementById('root') as Element).render(
  <React.StrictMode>
    <ContextProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/App" element={<App />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    </Router>
    </ContextProvider>
  </React.StrictMode>
)
