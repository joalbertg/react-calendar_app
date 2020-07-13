import types from '~types';

export const uiOpenModal = () => ({
  type: types.UI_OPEN_MODAL
});

export const uiCloseModal = () => ({
  type:types.UI_CLOSE_MODAL
});

export const setError = err => ({
  type: types.UI_SET_ERROR,
  payload: err
});

export const removeError = () => ({
  type: types.UI_REMOVE_ERROR
});

