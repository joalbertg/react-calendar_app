import types from '~types';

describe('Tests types file', () => {
  test('Should be same', () => {
    const currentTypes = {
      UI_OPEN_MODAL:            '[UI] OPEN_MODAL',
      UI_CLOSE_MODAL:           '[UI] CLOSE_MODAL',
      UI_SET_ERROR:             '[UI] UI_SET_ERROR',
      UI_REMOVE_ERROR:          '[UI] UI_REMOVE_ERROR',


      EVENT_START_ADD_NEW:      '[EVENT] START_ADD_NEW',
      EVENT_SET_ACTIVE:         '[EVENT] SET_ACTIVE',
      EVENT_CLEAR:              '[EVENT] CLEAR',
      EVENT_ADD_NEW:            '[EVENT] ADD_NEW',
      EVENT_CLEAR_ACTIVE_EVENT: '[EVENT] CLEAR_ACTIVE_EVENT',
      EVENT_UPDATED:            '[EVENT] UPDATED',
      EVENT_DELETED:            '[EVENT] DELETED',
      EVENT_LOADED:             '[EVENT] LOADED',

      AUTH_CHECKING_FINISH:     '[AUTH] CHECKING_FINISH',
      AUTH_START_LOGIN:         '[AUTH] AUTH_START_LOGIN',
      AUTH_LOGIN:               '[AUTH] LOGIN',
      AUTH_START_REGISTER:      '[AUTH] START_REGISTER',
      AUTH_START_TOKEN_RENEW:   '[AUTH] START_TOKEN_RENEW',
      AUTH_LOGOUT:              '[AUTH] LOGOUT'
    };

    expect(types).toMatchObject(currentTypes);
  });
});

