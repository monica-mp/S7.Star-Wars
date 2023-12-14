import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App'
import Home from './components/Home/Home'

// Establir rutes
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/app',
    element: <App />
  }
])

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
