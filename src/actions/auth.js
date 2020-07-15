import Swal from 'sweetalert2';

import types from '~types';
import {
  fetchWithoutToken,
  fetchWithToken
} from '~helpers/fetch';

export const login = user => ({
  type: types.AUTH_LOGIN,
  payload: user
});

export const startLogin = (email, password) => {
  return async (dispatch) => {
    const resp = await fetchWithoutToken('auth', { email, password }, 'POST');
    const body = await resp.json();

    if(body.ok) {
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(login(body.user));
    } else {
      let msg = body.error.message ? body.error.message : body.error.reduce((acc, curr) => {
        return `${acc} ${curr.msg}`.trim();
      },'');
      Swal.fire('Error', msg, 'error');
    }
  };
}

export const startRegister = (name, email, password) => {
  return async (dispatch) => {
    const resp = await fetchWithoutToken('auth/new', { name, email, password }, 'POST');
    const body = await resp.json();

    if(body.ok) {
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(login(body.user));
    } else {
      let msg = body.error.message ? body.error.message : body.error.reduce((acc, curr) => {
        return `${acc} ${curr.msg}`.trim();
      },'');
      Swal.fire('Error', msg, 'error');
    }
  };
}

export const checkingFinish = () => ({
  type: types.AUTH_CHECKING_FINISH
});

export const startSchecking = () => {
  return async (dispatch) => {
    const resp = await fetchWithToken('auth/renew');
    const body = await resp.json();

    if(body.ok) {
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(login(body.user));
    } else {
      dispatch(checkingFinish());
    }
  }
}

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(logout());
  }
}

export const logout = () => ({
  type: types.AUTH_LOGOUT
});

