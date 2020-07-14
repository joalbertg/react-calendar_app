import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect
} from 'react-router-dom';
import {
  useDispatch,
  useSelector
} from 'react-redux';

import { startSchecking } from '~actions';
import LoginScreen from '~components/auth';
import CalendarScreen from '~components/calendar';

import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, uid } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(startSchecking());
  },[dispatch]);

  if(checking) {
    return <h5>wait...</h5>
  }

  return(
    <Router>
      <div>
        <Switch>
          <PublicRoute
            isLoggedIn={!!uid}
            exact path='/auth/login'
            component={LoginScreen}
          />
          <PrivateRoute
            isLoggedIn={!!uid}
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

