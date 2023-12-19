import React from 'react'
import { createRoot } from 'react-dom/client'
import { Rutes } from '../src/Routes/Routes'
import { ContextProvider } from './Context'

createRoot(document.getElementById('root') as Element).render(
  <React.StrictMode>
    <ContextProvider>
      <Rutes />
    </ContextProvider>
  </React.StrictMode>
)
