import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { act } from '@testing-library/react';
import Swal from 'sweetalert2';

import '@testing-library/jest-dom';

import CalendarScreen from '~components/calendar';
import { messages } from '~helpers/calendar-messages-es';
import types from '~types';
import { eventSetActive } from '~actions';

jest.mock('~actions', () => ({
  ...jest.requireActual('~actions'),
  eventSetActive: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const [uid, name] = ['123', 'joalbert'];
const initState = {
  auth: {
    checking: true,
    uid,
    name
  },
  calendar: {
    activeEvent: null,
    events: []
  },
  ui: {
    openModal: false
  }
};

const store = mockStore(initState);

store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <CalendarScreen />
  </Provider>
);

describe('Tests CalendarScreen component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Should display correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.calendar-screen').exists()).toBeTruthy();
  });

  describe('Should to interact with the calendar', () => {
    const calendar = wrapper.find('Calendar');

    Storage.prototype.setItem = jest.fn();

    test('Should return messages', () => {
      const calendarMessages = calendar.prop('messages');
      expect(calendarMessages).toMatchObject(messages);
    });

    test('Should call the openModal', () => {
      calendar.prop('onDoubleClickEvent')();

      expect(store.dispatch).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith({ type: types.UI_OPEN_MODAL });
    });

    test('Should call the setActive', () => {
      const id = 'eventId';
      calendar.prop('onSelectEvent')({ id });

      expect(store.dispatch).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(eventSetActive).toHaveBeenCalledWith(id);
    });

    test('Should save to localStorage', async () => {
      const tab = 'week';
      act(() => {
        calendar.prop('onView')(tab);
      });

      expect(localStorage.setItem).toHaveBeenCalled();
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(localStorage.setItem).toHaveBeenCalledWith('lastView', tab);
    });
  });
});

