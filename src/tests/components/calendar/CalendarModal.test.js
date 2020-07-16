import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moment from 'moment';
import { act } from '@testing-library/react';
import Swal from 'sweetalert2';

import '@testing-library/jest-dom';

import { CalendarModal } from '~components/calendar/CalendarModal';
import {
  eventStartUpdate,
  eventClearActiveEvent,
  uiCloseModal,
  eventStartAddNew
} from '~actions';

jest.mock('~actions', () => ({
  ...jest.requireActual('~actions'),
  eventStartUpdate: jest.fn(),
  eventClearActiveEvent: jest.fn(),
  uiCloseModal: jest.fn(),
  eventStartAddNew: jest.fn()
}));

jest.mock('sweetalert2', () => ({
  fire: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const [uid, name] = ['123', 'joalbert'];
const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlus1 = now.clone().add(1, 'hours');
const event = {
  id: 'ABCDEF123456',
  title: 'titulo',
  notes: 'notas',
  start: now.toDate(),
  end: nowPlus1.toDate(),
  user: {
    _id: uid,
    name
  }
};

const initState = {
  auth: {
    checking: true,
    uid,
    name
  },
  calendar: {
    activeEvent: event,
    events: {
      'ABCDEF123456': event
    }
  },
  ui: {
    openModal: true
  }
};

const store = mockStore(initState);

store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <CalendarModal />
  </Provider>
);

describe('Tests CalendarModal component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const modal = wrapper.find('Modal');

  test('Should display correctly', () => {
    //no se recomienta usarlo porque depende de una fecha
    //y estaria mutando, al menos que se haga un mock y la fecha
    //no cambie
    //expect(wrapper).toMatchSnapshot();
    expect(modal.prop('isOpen')).toBeTruthy();
  });

  describe('Should to interact with the Modal', () => {
    test('Should call eventStartUpdate and closeModal', () => {
      modal.find('form').simulate('submit', {
        preventDefault(){}
      });

      expect(eventStartUpdate).toHaveBeenCalled();
      expect(eventStartUpdate).toHaveBeenCalledTimes(1);
      expect(eventStartUpdate).toHaveBeenCalledWith(event);
      expect(eventClearActiveEvent).toHaveBeenCalled();
      expect(eventClearActiveEvent).toHaveBeenCalledTimes(1);
      expect(uiCloseModal).toHaveBeenCalled();
      expect(uiCloseModal).toHaveBeenCalledTimes(1);
    });

    test('Should display error if title not found', () => {
      modal.find('form').simulate('submit', {
        preventDefault(){}
      });

      //it does not work
      //expect(modal.find('input[name="title"]').hasClass('is-invalid')).toBeTruthy();
      expect(wrapper.find('input[name="title"]').hasClass('is-invalid')).toBeTruthy();
    });

    test('Should create a new event', () => {
      const title = 'new title';

      const initState = {
        auth: {
          checking: true,
          uid,
          name
        },
        calendar: {
          activeEvent: null,
          events: {}
        },
        ui: {
          openModal: true
        }
      };

      const store = mockStore(initState);

      store.dispatch = jest.fn();

      const wrapper = mount(
        <Provider store={store}>
          <CalendarModal />
        </Provider>
      );

      act(() => {
        wrapper.find('input[name="title"]').prop('onChange')({
          target: {
            name: 'title',
            value: title
          }
        });
      });

      wrapper.find('form').simulate('submit', {
        preventDefault(){}
      });

      expect(eventStartAddNew).toHaveBeenCalled();
      expect(eventStartAddNew).toHaveBeenCalledTimes(1);
      expect(eventStartAddNew).toHaveBeenCalledWith({
        title,
        notes: '',
        start: expect.anything(),
        end: expect.anything()
      });
      expect(eventClearActiveEvent).toHaveBeenCalled();
      expect(eventClearActiveEvent).toHaveBeenCalledTimes(1);
    });

    test('Should ', async () => {
      const title = 'new title';
      const today = new Date();

      act(() => {
        wrapper.find('input[name="title"]').prop('onChange')({
          target: {
            name: 'title',
            value: title
          }
        });

        wrapper.find('DateTimePicker').at(1).prop('onChange')(today);
      });

      wrapper.find('form').simulate('submit', {
        preventDefault(){}
      });

      expect(Swal.fire).toHaveBeenCalled();
      expect(Swal.fire).toHaveBeenCalledTimes(1);
      expect(Swal.fire).toHaveBeenCalledWith("Error", "The date end must be greater.", "error");
    });
  });
});

