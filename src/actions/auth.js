import types from '~types';
import { fetchWithoutToken } from '~helpers/fetch';

export const startLogin = (email, password) => {
  return async (dispatch) => {
    const resp = await fetchWithoutToken('auth', { email, password }, 'POST');
    const body = await resp.json();

    if(body.ok) {
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(login(body.user));
    }
  };
}

export const login = user => ({
  type: types.AUTH_LOGIN,
  payload: user
});

