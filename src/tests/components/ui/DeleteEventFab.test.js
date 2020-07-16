import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';

import { DeleteEventFab } from '~components/ui';
import { eventStartDelete } from '~actions';

jest.mock('~actions', () => ({
  eventStartDelete: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {};
const store = mockStore(initState);

store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <DeleteEventFab />
  </Provider>
);

describe('Test DeleteEventFab component', () => {
  test('Should display correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('Should call to dispatch', async () => {
    wrapper.find('button').prop('onClick')();

    expect(store.dispatch).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(eventStartDelete).toHaveBeenCalled();
  });
});

