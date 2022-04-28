import { StrictMode } from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import { StoreProvider } from 'Stores'
import 'tailwindcss/tailwind.css'

import App from './App'
import './global/global.css'

render(
  <StrictMode>
    <StoreProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StoreProvider>
  </StrictMode>,
  document.getElementById('root')
)
