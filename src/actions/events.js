import types from '~types';

export const eventAddNew = event => ({
  type: types.EVENT_ADD_NEW,
  payload: event
});

export const eventSetActive = id => ({
  type: types.EVENT_SET_ACTIVE,
  payload: { id }
});
