import React from 'react';
import { useDispatch } from 'react-redux';

import { eventDeleted } from '~actions';

export const DeleteEventFab = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(eventDeleted());
  }

  return(
    <button
      onClick={handleClick}
      className='btn btn-danger fab-danger'
    >
      <i className='fas fa-trash'></i>
    </button>
  );
}

