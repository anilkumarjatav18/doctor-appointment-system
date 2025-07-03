import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react'
import "antd/dist/reset.css"
import './index.css'
import App from './App.jsx'
import {Provider} from "react-redux"
import Store from './redux/Store.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  </Provider>
)
