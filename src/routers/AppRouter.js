import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect
} from 'react-router-dom';

import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

import LoginScreen from '~components/auth';
import CalendarScreen from '~components/calendar';

const AppRouter = () => {
  //const isLoggedIn = false;
  const isLoggedIn = true;
  return(
    <Router>
      <div>
        <Switch>
          <PublicRoute
            isLoggedIn={isLoggedIn}
            exact path='/auth/login'
            component={LoginScreen}
          />
          <PrivateRoute
            isLoggedIn={isLoggedIn}
            exact path='/'
            component={CalendarScreen}
          />

          <Redirect to='/auth/login' />
        </Switch>
      </div>
    </Router>
  );
}

export default AppRouter;

