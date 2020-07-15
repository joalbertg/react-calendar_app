import Swal from 'sweetalert2';

import types from '~types';
import { fetchWithToken } from '~helpers/fetch';
import {
  prepareEvent,
  prepareEvents
} from '~helpers/prepare-events';

export const eventStartAddNew = event => {
  return async (dispatch, getState) => {
    try {
      const resp = await fetchWithToken('events', event, 'POST');
      const body = await resp.json();

      if(body.ok) {
        const { uid, name } = getState().auth;
        dispatch(eventAddNew({ ...prepareEvent(body.eventSave), user: { _id: uid, name } }));
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

export const eventStartUpdate = event => {
  return async (dispatch, getState) => {
    try {
      const resp = await fetchWithToken(`events/${event.id}`, event, 'PUT');
      const body = await resp.json();

      if(body.ok) {
        const { uid, name } = getState().auth;
        dispatch(eventUpdated({ ...prepareEvent(body.updatedEvent), user: { _id: uid, name } }));
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

const eventUpdated = event => ({
  type: types.EVENT_UPDATED,
  payload: event
});

const eventDeleted = () => ({
  type: types.EVENT_DELETED
});

export const eventStartDelete = () => {
  return async (dispatch, getState) => {
    try {
      const { id } = getState().calendar.activeEvent;
      const resp = await fetchWithToken(`events/${id}`, {}, 'DELETE');
      const body = await resp.json();

      if(body.ok) {
        dispatch(eventDeleted());
      } else {
        const msg = body.error.message ? body.error.message : body.error.reduce((acc, curr) => {
          return `${acc} ${curr.msg}`;
        },'');
        Swal.fire('Error', msg, 'error');
      }
    } catch(error) {
      Swal.fire('Error', error, 'error');
    }
  }
}

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

export const eventClear = () => ({
  type: types.EVENT_CLEAR
});

