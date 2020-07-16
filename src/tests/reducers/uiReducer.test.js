import types from '~types';

import { uiReducer } from '~reducers/uiReducer';

const initState = {
  openModal: false
};

describe('Tests uiReducer file', () => {
  it('Should return default state', async () => {
    const state = uiReducer(initState, {});
    expect(state).toMatchObject(initState);
  });

  it('Should return openMOdal true', () => {
    const state = uiReducer(initState, { type: types.UI_OPEN_MODAL });
    expect(state.openModal).toBeTruthy();
  });

  it('Should return openMOdal false', () => {
    let state = uiReducer(initState, { type: types.UI_OPEN_MODAL });
    state = uiReducer(state, { type: types.UI_CLOSE_MODAL });
    expect(state.openModal).toBeFalsy();
  });
});

