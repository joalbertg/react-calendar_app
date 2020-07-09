import React from 'react';
import { Provider } from 'react-redux';

import store from '~store';
import AppRouter from '~routers';

const CalendarApp = () => {
  return(
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default CalendarApp;

