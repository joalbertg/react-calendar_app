import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { act } from '@testing-library/react';
import Swal from 'sweetalert2';

import '@testing-library/jest-dom';

import LoginScreen from '~components/auth';
import {
  startLogin,
  removeError,
  startRegister,
  setError
} from '~actions';

jest.mock('~actions', () => ({
  startLogin: jest.fn(),
  removeError: jest.fn(),
  startRegister: jest.fn(),
  setError: jest.fn()
}));

jest.mock('sweetalert2', () => ({
  fire: jest.fn(() => ({
    then: jest.fn()
  }))
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
  auth: {
    checking: true
  }
};

const store = mockStore(initState);

store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <LoginScreen />
  </Provider>
);

describe('Tests LoginScreen component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Should display correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.login-container').exists()).toBeTruthy();
  });

  test('Should call dispatch the startLogin', async () => {
    const [email, password] = ['test@testing.com', '123456'];

    wrapper.find('input[name="lEmail"]').simulate('change', {
      target: {
        name: 'lEmail',
        value: email
      }
    });

    wrapper.find('input[name="lPassword"]').simulate('change', {
      target: {
        name: 'lPassword',
        value: password
      }
    });

    act(() => {
      wrapper.find('form').at(0).prop('onSubmit')({
        preventDefault(){}
      });
    });

    expect(startLogin).toHaveBeenCalled();
    expect(startLogin).toHaveBeenCalledTimes(1);
    expect(startLogin).toHaveBeenCalledWith(email, password);
    expect(removeError).toHaveBeenCalled();
    expect(removeError).toHaveBeenCalledTimes(1);
  });

  test('Should call dispatch the startLogin', async () => {
    const [name, email, password, password2] = ['test', 'test@testing.com', '123456', '123457'];
    const msg = 'Password should be at least 6 characters and match each other';

    wrapper.find('input[name="rName"]').simulate('change', {
      target: {
        name: 'rName',
        value: name
      }
    });

    wrapper.find('input[name="rEmail"]').simulate('change', {
      target: {
        name: 'rEmail',
        value: email
      }
    });

    wrapper.find('input[name="rPassword"]').simulate('change', {
      target: {
        name: 'rPassword',
        value: password
      }
    });

    wrapper.find('input[name="rPassword2"]').simulate('change', {
      target: {
        name: 'rPassword2',
        value: password2
      }
    });

    act(() => {
      wrapper.find('form').at(1).prop('onSubmit')({
        preventDefault(){}
      });
    });

    expect(startRegister).not.toHaveBeenCalled();
    expect(startRegister).toHaveBeenCalledTimes(0);
    expect(setError).toHaveBeenCalled();
    expect(setError).toHaveBeenCalledTimes(1);
    expect(setError).toHaveBeenCalledWith(msg);
    expect(Swal.fire).toHaveBeenCalled();
    expect(Swal.fire).toHaveBeenCalledTimes(1);
    expect(Swal.fire).toHaveBeenCalledWith({
      title: 'Error',
      text: msg,
      icon: 'error'
    });
  });

  test('Should call dispatch the startLogin', async () => {
    const [name, email, password, password2] = ['test', 'test@testing.com', '123456', '123456'];

    wrapper.find('input[name="rName"]').simulate('change', {
      target: {
        name: 'rName',
        value: name
      }
    });

    wrapper.find('input[name="rEmail"]').simulate('change', {
      target: {
        name: 'rEmail',
        value: email
      }
    });

    wrapper.find('input[name="rPassword"]').simulate('change', {
      target: {
        name: 'rPassword',
        value: password
      }
    });

    wrapper.find('input[name="rPassword2"]').simulate('change', {
      target: {
        name: 'rPassword2',
        value: password2
      }
    });

    act(() => {
      wrapper.find('form').at(1).prop('onSubmit')({
        preventDefault(){}
      });
    });

    expect(startRegister).toHaveBeenCalled();
    expect(startRegister).toHaveBeenCalledTimes(1);
    expect(startRegister).toHaveBeenCalledWith(name, email, password);
    expect(setError).not.toHaveBeenCalled();
  });
});

