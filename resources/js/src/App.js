import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import '../../css/app.css';
import '../../css/auth.css';

import Dashboard from './components/dashboard/Dashboard';
import PublicRoute from './components/PublicRoute';
import ProtectedRoute from './components/ProtectedRoute';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import Login from './components/auth/Login';
import Logout from './components/auth/Logout';
import Setting from './components/setting/Setting';
import GuestIndex from './components/guestlist/GuestIndex';
import Create from './components/guestlist/Create'
import Detail from './components/guestlist/Detail'
import FillInvite from './components/fill-invite/FillInvite';
import RegistrationCode from './components/fill-invite/RegistrationCode';

const App = () => {
  return (
    <Router className="App__container">
      <Switch>
        {/* <ProtectedRoute exact path="/" component={() => <Redirect to="/dashboard" />} /> */}
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/setting" component={Setting} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/reset-password" component={ResetPassword} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/guest/list" component={GuestIndex}/>
        <Route exact path="/guest/add" component={Create}/>
        <Route exact path="/guest/favorites/:id" component={Detail}/>
        <Route exact path="/" component={FillInvite}/>
        <Route exact path="/registration/" component={RegistrationCode}/>
      </Switch>
    </Router>
  )
};

ReactDOM.render(<App />, document.getElementById('app'));