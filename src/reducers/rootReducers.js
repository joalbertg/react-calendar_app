import { combineReducers } from 'redux';

import { authReducer } from './authReducer';
import { uiReducer } from './uiReducer';
import { calendarReducer } from './calendarReducer';

export const rootReducers = combineReducers({
  ui: uiReducer,
  calendar: calendarReducer,
  auth: authReducer
});

