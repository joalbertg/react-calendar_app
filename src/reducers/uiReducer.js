import types from '~types';

const initialState = {
  openModal: false,
};

export const uiReducer = (state = initialState, action) => {
  const { type } = action;
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
    default:
      return state;
  }
}

