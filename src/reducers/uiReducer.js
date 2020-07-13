import types from '~types';

const initialState = {
  openModal: false,
  msgError: null
};

export const uiReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch(type) {
    case types.UI_OPEN_MODAL:
      return {
        ...state,
        openModal: true
      };
    case types.UI_CLOSE_MODAL:
      return {
        ...state,
        openModal: false
      };
    case types.UI_SET_ERROR:
      return {
        ...state,
        msgError: payload
      };
    case types.UI_REMOVE_ERROR:
      return {
        ...state,
        msgError: null
      };
    default:
      return state;
  }
}

