import types from '~types';

//{
//  'ABCD1234': {
//    id: 'ABCD1234',
//    title: 'Random Birthday',
//    start: moment().toDate(),
//    end: moment().add(2, 'hours').toDate(),
//    notes: 'buy the cake',
//    user: {
//      _id: '123',
//      name: 'Joalbert'
//    }
//  }
//}

const initialState = {
  events: {},
  activeEvent: null
};

export const calendarReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch(type) {
    case types.EVENT_ADD_NEW:
      return {
        ...state,
        events: { ...state.events, [payload.id]: payload }
      };
    case types.EVENT_SET_ACTIVE:
      return {
        ...state,
        activeEvent: state.events[payload.id]
      };
    case types.EVENT_CLEAR_ACTIVE_EVENT:
      return {
        ...state,
        activeEvent: null
      };
    case types.EVENT_UPDATED:
      return {
        ...state,
        events: { ...state.events, [payload.id]: payload },
        activeEvent: null
      };
    case types.EVENT_DELETED:
      const { events, activeEvent } = state;
      delete events[activeEvent.id];

      return {
        ...state,
        events: { ...events },
        activeEvent: null
      };
    case types.EVENT_LOADED:
      return {
        ...state,
        events: payload.reduce((acc, curr) => {
          acc[curr.id] = curr;
          return acc;
        }, {})
      };
    case types.EVENT_CLEAR:
      return { ...initialState };
    default:
      return state;
  }
}

