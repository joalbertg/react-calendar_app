import React from 'react';
import { useDispatch } from 'react-redux';

import { useForm } from '~hooks';
import { startLogin } from '~actions';

import './login.css';

const initLoginState = {
  lEmail: '',
  lPassword: ''
};

const initRegisterState = {
  rName: '',
  rEmail: '',
  rPassword: '',
  rPassword2: ''
};

const LoginScreen = () => {
  const [formLoginValues, handleLoginInputChange, handleLoginReset] = useForm(initLoginState);
  const [formRegisterValues, handleRegisterInputChange, handleRegisterReset] = useForm(initRegisterState);
  const { lEmail, lPassword } = formLoginValues;
  const { rName, rEmail, rPassword, rPassword2 } = formRegisterValues;
  const dispatch = useDispatch();

  const handleLoginSubmit = event => {
    event.preventDefault();

    dispatch(startLogin(lEmail, lPassword));
    handleLoginReset();
  }

  const handleRegisterSubmit = event => {
    event.preventDefault();
    console.log(formRegisterValues);
    handleRegisterReset();
  }

  return (
    <div className='container login-container'>
      <div className='row'>
        <div className='col-md-6 login-form-1'>
          <h3>Ingreso</h3>
          <form
            onSubmit={handleLoginSubmit}
          >
            <div className='form-group'>
              <input
                type='text'
                className='form-control'
                placeholder='Correo'
                name='lEmail'
                value={lEmail}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                className='form-control'
                placeholder='Contraseña'
                name='lPassword'
                value={lPassword}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className='form-group'>
              <input
                type='submit'
                className='btnSubmit'
                value='Login'
              />
            </div>
          </form>
        </div>

        <div className='col-md-6 login-form-2'>
          <h3>Registro</h3>
          <form
            onSubmit={handleRegisterSubmit}
          >
              <div className='form-group'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Nombre'
                  name='rName'
                  value={rName}
                  onChange={handleRegisterInputChange}
                />
              </div>
              <div className='form-group'>
                <input
                  type='email'
                  className='form-control'
                  placeholder='Correo'
                  name='rEmail'
                  value={rEmail}
                  onChange={handleRegisterInputChange}
                />
              </div>
              <div className='form-group'>
                <input
                  type='password'
                  className='form-control'
                  placeholder='Contraseña'
                  name='rPassword'
                  value={rPassword}
                  onChange={handleRegisterInputChange}
                />
              </div>

              <div className='form-group'>
                <input
                  type='password'
                  className='form-control'
                  placeholder='Repita la contraseña' 
                  name='rPassword2'
                  value={rPassword2}
                  onChange={handleRegisterInputChange}
                />
              </div>

              <div className='form-group'>
                <input
                  type='submit'
                  className='btnSubmit'
                  value='Crear cuenta'
                />
              </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen;

