import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  startLogout,
  eventClear
} from '~actions';

export const Navbar = () => {
  const { name } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(startLogout());
    dispatch(eventClear());
  }

  return(
    <div className='navbar navbar-dark bg-dark mb-4'>
      <span className='navbar-brand'>
        { name }
      </span>

      <button
        className='btn btn-outline-danger'
        onClick={handleLogout}
      >
        <i className='fas fa-sign-out-alt'></i>
        <span> Exit</span>
      </button>
    </div>
  );
}

