import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect
} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { startSchecking } from '~actions';

import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

import LoginScreen from '~components/auth';
import CalendarScreen from '~components/calendar';

const AppRouter = () => {
  const dispatch = useDispatch();

  //const isLoggedIn = false;
  const isLoggedIn = true;

  useEffect(() => {
    dispatch(startSchecking());
  },[dispatch]);

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

