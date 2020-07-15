import { fetchWithToken, fetchWithoutToken } from '~helpers/fetch';

describe('Tests fetch helper file', () => {
  let token = null;

  it('Should return a Response of the fetchWithToken method', async () => {
    const user = {
      email: 'joalbertgonzalez@gmail.com',
      password: '123456'
    };

    const resp = await fetchWithoutToken('auth', user, 'POST');
    const body = await resp.json();
    token = body.token;

    expect(resp instanceof Response).toBeTruthy();
    expect(body.ok).toBeTruthy();
    expect(body.token).toBeTruthy();
    expect(typeof body.token).toBe('string');
    expect(body.user).toEqual({
      uid: expect.any(String),
      name: expect.any(String)
    });
  });

  it('Should return a Response correctly of the fetchWithToken method', async () => {
    localStorage.setItem('token', token);

    const resp = await fetchWithToken('events/5f0b55e9c9b2e400ea061ca4', {}, 'DELETE');
    const  body = await resp.json();

    expect(resp instanceof Response).toBeTruthy();
    expect(body.ok).toBeFalsy();
    expect(body.error).toMatchObject({
      message: 'Event not found'
    });
  });
});

