import React from 'react'
import ReactDOM from 'react-dom/client'
import { Offline, Online } from 'react-detect-offline'
import { Alert } from 'antd'

import './index.css'
import App from './components/App/App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <>
    <Online>
      <div className="container">
        <App />
      </div>
    </Online>
    <Offline>
      <Alert message="Error connection" description="No internet, Sorry" type="error" />
    </Offline>
  </>,
)
