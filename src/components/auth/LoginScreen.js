import React from 'react';
import {
  useDispatch
} from 'react-redux';
import validator from 'validator';
import Swal from 'sweetalert2';

import { useForm } from '~hooks';
import {
  startLogin,
  startRegister,
  setError,
  removeError
} from '~actions';

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

  const alert = msg => {
    Swal.fire({
      title: 'Error',
      text: msg,
      icon: 'error',
    }).then((result) => {
      if (result.value) {
        dispatch(removeError());
      }
    });
  }

  const isFormLoginValid = () => {
    if(!validator.isEmail(lEmail)) {
      const msg = 'Email is not valid';

      dispatch(setError(msg));
      alert(msg);

      return false;
    } else if(lPassword.length < 6) {
      const msg = 'Password should be at least 6 characters and match each other';

      dispatch(setError(msg));
      alert(msg);

      return false;
    }

    dispatch(removeError());
    return true;
  }

  const isFormRegisterValid = () => {
    if(rName.trim().length === 0) {
      const msg = 'Name is required';

      dispatch(setError(msg));
      alert(msg);

      return false;
    } else if(!validator.isEmail(rEmail)) {
      const msg = 'Email is not valid';

      dispatch(setError(msg));
      alert(msg);

      return false;
    } else if(rPassword !== rPassword2 || rPassword.length < 6) {
      const msg = 'Password should be at least 6 characters and match each other';

      dispatch(setError(msg));
      alert(msg);

      return false;
    }

    return true;
  }

  const handleLogin = event => {
    event.preventDefault();

    if(isFormLoginValid()) {
      dispatch(startLogin(lEmail, lPassword));
      handleLoginReset();
    }
  }

  const handleRegister = event => {
    event.preventDefault();

    if(isFormRegisterValid()) {
      dispatch(startRegister(rName, rEmail, rPassword));
      handleRegisterReset();
    }
  }

  return (
    <div className='container login-container'>
      <div className='row'>
        <div className='col-md-6 login-form-1'>
          <h3>Ingreso</h3>
          <form
            onSubmit={handleLogin}
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
            onSubmit={handleRegister}
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

