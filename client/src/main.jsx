import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { FundTransferProvider } from './context/FundTransferContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <FundTransferProvider>
    <React.StrictMode>
    <App />
    </React.StrictMode>
  </FundTransferProvider>,
)
