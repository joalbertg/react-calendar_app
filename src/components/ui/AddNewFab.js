import React from 'react';
import { useDispatch } from 'react-redux';

import { uiOpenModal, eventClearActiveEvent } from '~actions';

export const AddNewFab = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(eventClearActiveEvent());
    dispatch(uiOpenModal());
  }

  return(
    <button
      onClick={handleClick}
      className='btn btn-primary fab'
    >
      <i className='fas fa-plus'></i>
    </button>
  );
}

