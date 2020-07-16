import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';

import AppRouter from '~routers';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Tests AddRouter component', () => {
  test('Should display wait...', () => {
    const initState = {
      auth: {
        checking: true
      }
    };

    const store = mockStore(initState);
    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('h5').exists()).toBeTruthy();
    expect(wrapper.find('h5').text()).toBe('wait...');
  });

  test('Should display public route', () => {
    const initState = {
      auth: {
        checking: false
      }
    };

    const store = mockStore(initState);
    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.login-container').exists()).toBeTruthy();
  });

  test('Should display private route', () => {
    const initState = {
      auth: {
        checking: false,
        uid: 'ABC123',
        name: 'joalbert'
      },
      calendar: {
        events: []
      },
      ui: {
        openModal: false
      }
    };

    const store = mockStore(initState);
    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.calendar-screen').exists()).toBeTruthy();
  });
});

