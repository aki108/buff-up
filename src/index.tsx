import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { StoreContext } from 'storeon/react'

import Routes from './Routes'
import store from './state/store'

import * as serviceWorker from './serviceWorker'

import 'antd/dist/antd.css'

ReactDOM.render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
      <Router>
        <Routes />
      </Router>
    </StoreContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

serviceWorker.unregister()
