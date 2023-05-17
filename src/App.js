import {Switch, Route, Redirect, withRouter} from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import Header from './components/Header'
import Jobs from './components/Jobs'
import JobItem from './components/JobItem'
import NotFound from './components/NotFound'

const App = props => {
  const {location} = props
  const {pathname} = location
  let shouldRenderHeader

  if (pathname === '/login' || pathname === '/not-found') {
    shouldRenderHeader = <></>
  } else {
    shouldRenderHeader = <Header />
  }

  return (
    <div className="bg-container">
      {shouldRenderHeader}
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/jobs" component={Jobs} />
        <ProtectedRoute exact path="/jobs/:id" component={JobItem} />
        <Route exact path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    </div>
  )
}

export default withRouter(App)
