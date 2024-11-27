import { createRoot } from 'react-dom/client'
import Routers from './components/routers'
import React from 'react'
import { ContextFile } from '../src/components/contextFile';

createRoot(document.getElementById('root')).render(
  <ContextFile>
    <Routers />
  </ContextFile>
)
