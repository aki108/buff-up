import React, { FunctionComponent } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Layout } from 'antd'

import { Footer, Header } from './components'
import DashboardPage from './pages/Dashboard'

const Routes: FunctionComponent = () => {
  return (
    <Layout>
      <Header />
      <Switch>
        <Route path="/" component={DashboardPage} exact />
      </Switch>
      <Footer />
    </Layout>
  )
}

export default Routes
