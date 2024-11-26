import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Routers from './components/routers'
import React from 'react'


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Routers />
  </React.StrictMode>,
)
