import types from '~types';

const initialState = {
  checking: true,
  // uid: null,
  // name: null
};

export const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch(type) {
    case types.AUTH_LOGIN:
      return {
        ...state,
        ...payload,
        checking: false
      };
    case types.AUTH_CHECKING_FINISH:
      return {
        ...state,
        checking: false
      };
    case types.AUTH_LOGOUT:
      return {
        checking: false
      };
    default:
      return state;
  }
}

