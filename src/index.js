import React from 'react'
import ReactDOM from 'react-dom/client'
import { Offline, Online } from 'react-detect-offline'
import { Alert } from 'antd'

import './index.css'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <>
    <Online>
      <App />
    </Online>
    <Offline>
      <Alert message="Error connection" description="No internet, Sorry" type="error" />
    </Offline>
  </>,
)
