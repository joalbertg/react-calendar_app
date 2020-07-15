import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';

import '@testing-library/jest-dom';

import { startLogin } from '~actions';
import types from '~types';

jest.mock('sweetalert2', () => ({
  fire: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {};

let store = mockStore(initState);

Storage.prototype.setItem = jest.fn();

describe('Test auth actions', () => {
  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks();
  });

  let token = null;

  test('Should be a correctly login', async () => {
    await store.dispatch(startLogin('joalbertgonzalez@gmail.com', '123456'));

    const actions = store.getActions();

    //console.log(localStorage.setItem.mock.calls);
    //[
    //  [
    //    'token',
    //    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZjBkYzAxNGIxYzYyYjAwMjdkYzFkN2YiLCJuYW1lIjoiam9hbGJlcnQiLCJpYXQiOjE1OTQ4MzIxMDIsImV4cCI6MTU5NDgzOTMwMn0.zlFDvdkk9u6dT3DTvYui72Y1iorM2OgCo1fb9coqY-8'
    //  ],
    //  [ 'token-init-date', 1594832102427 ]
    //]

    token = localStorage.setItem.mock.calls[0][1];

    expect(actions[0]).toMatchObject({
      type: types.AUTH_LOGIN,
      payload: {
        uid: expect.any(String),
        name: expect.any(String)
      }
    });

    expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    expect(localStorage.setItem).toHaveBeenNthCalledWith(1, 'token', expect.any(String));
    expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));
  });

  test('Should be an incorrectly login by email', async () => {
    await store.dispatch(startLogin('joalbertgonzalezgmail.com', '123457'));

    const actions = store.getActions();

    expect(actions).toEqual([]);
    expect(Swal.fire).toHaveBeenCalled();
    expect(Swal.fire).toHaveBeenCalledTimes(1);
    expect(Swal.fire).toHaveBeenCalledWith('Error', 'Email is required', 'error');
  });

  test('Should be an incorrectly login by password', async () => {
    await store.dispatch(startLogin('joalbertgonzalez@gmail.com', '123457'));

    const actions = store.getActions();

    expect(actions).toEqual([]);
    expect(Swal.fire).toHaveBeenCalled();
    expect(Swal.fire).toHaveBeenCalledTimes(1);
    expect(Swal.fire).toHaveBeenCalledWith('Error', 'Unauthorized.', 'error');
  });

  test('Should be an incorrectly login by Email and password', async () => {
    await store.dispatch(startLogin('', ''));

    const actions = store.getActions();

    expect(actions).toEqual([]);
    expect(Swal.fire).toHaveBeenCalled();
    expect(Swal.fire).toHaveBeenCalledTimes(1);
    expect(Swal.fire).toHaveBeenCalledWith('Error', 'Email is required Password is required and must have a minimum of 6 characters', 'error');
  });
});

