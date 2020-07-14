import Swal from 'sweetalert2';

import types from '~types';
import { fetchWithToken } from '~helpers/fetch';
import { prepareEvents } from '~helpers/prepare-events';

export const eventStartAddNew = event => {
  return async (dispatch, getState) => {
    try {
      const resp = await fetchWithToken('events', event, 'POST');
      const body = await resp.json();

      if(body.ok) {
        const { uid, name } = getState().auth;
        dispatch(eventAddNew({ ...body.eventSave, user: { _id: uid, name } }));
      } else {
        let msg = body.error.message ? body.error.message : body.error.reduce((acc, curr) => {
          return `${acc} ${curr.msg}`;
        },'');
        Swal.fire('Error', msg, 'error');
      }
    } catch(error) {
        Swal.fire('Error', error, 'error');
    }
  }
}

const eventAddNew = event => ({
  type: types.EVENT_ADD_NEW,
  payload: event
});

export const eventSetActive = id => ({
  type: types.EVENT_SET_ACTIVE,
  payload: { id }
});

export const eventClearActiveEvent = () => ({
  type: types.EVENT_CLEAR_ACTIVE_EVENT
});

export const eventUpdated = event => ({
  type: types.EVENT_UPDATED,
  payload: event
});

export const eventDeleted = () => ({
  type: types.EVENT_DELETED
});

const eventLoaded = events => ({
  type: types.EVENT_LOADED,
  payload: events
});

export const eventStartLoading = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken('events');
      const body = await resp.json();

      if(body.ok) {
        dispatch(eventLoaded(prepareEvents(body.events)));
      } else {
        let msg = body.error.message ? body.error.message : body.error.reduce((acc, curr) => {
          return `${acc} ${curr.msg}`;
        },'');
        Swal.fire('Error', msg, 'error');
      }

    } catch(error) {
      Swal.fire('Error', error, 'error');
    }
  }
}

