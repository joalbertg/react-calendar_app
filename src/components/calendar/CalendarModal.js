import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import {
  useSelector,
  useDispatch
} from 'react-redux';

import {
  uiCloseModal,
  eventAddNew,
  eventClearActiveEvent,
  eventUpdated
} from '~actions';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlus1 = now.clone().add(1, 'hours');
const initEvent = {
  title: '',
  notes: '',
  start: now.toDate(),
  end: nowPlus1.toDate()
}

// Make sure to bind modal to your appElement
// (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

export const CalendarModal = () => {
  const { openModal } = useSelector(state => state.ui);
  const { activeEvent } = useSelector(state => state.calendar);
  const dispatch = useDispatch();

  const [dateStart, setDateStart] = useState(now.toDate());
  const [dateEnd, setDateEnd] = useState(nowPlus1.toDate());
  const [titleValid, setTitleValid] = useState(true);
  const [formValues, setFormValues] = useState(initEvent);

  const { title, notes, start, end } = formValues;

  useEffect(() => {
    if(activeEvent) {
      setFormValues(activeEvent);
    } else {
      setFormValues(initEvent);
    }
  }, [activeEvent]);

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    });
  }

  const closeModal = () => {
    dispatch(eventClearActiveEvent());
    setFormValues(initEvent);
    dispatch(uiCloseModal());
  }

  const handleStartDateChange = event => {
    //console.log(event);
    setDateStart(event);
    setFormValues({
      ...formValues,
      start: event
    });
  }

  const handleEndDateChange = event => {
    //console.log(event);
    setDateEnd(event);
    setFormValues({
      ...formValues,
      end: event
    });
  }

  const handleSubmit = event => {
    event.preventDefault();

    const momentStart = moment(start);
    const momentEnd = moment(end);

    if(momentStart.isSameOrAfter(momentEnd)) {
      return Swal.fire('Error', 'The date end must be greater.', 'error');
    }

    if(title.trim().length < 2) {
      return setTitleValid(false);
    }

    if(formValues.id) {
      dispatch(eventUpdated(formValues));
    } else {
      dispatch(eventAddNew({
        id: new Date().getTime(),
        ...formValues,
        user: {
          _id: '123',
          name: 'Jolabert'
        }
      }));
    }

    setTitleValid(true);
    setFormValues(initEvent);
    closeModal();
  }

  return(
    <Modal
      className='modal'
      overlayClassName='modal-fondo'
      isOpen={openModal}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
    >
      <h1> { activeEvent ? 'Edit Event' : 'New event' } </h1>
      <hr />
      <form
        className='container'
        onSubmit={handleSubmit}
      >
        <div className='form-group'>
          <label>Fecha y hora inicio</label>
          <DateTimePicker
            className='form-control'
            onChange={handleStartDateChange}
            value={dateStart}
            //maxDate={dateEnd}
          />
        </div>
        <div className='form-group'>
          <label>Fecha y hora fin</label>
          <DateTimePicker
            className='form-control'
            onChange={handleEndDateChange}
            value={dateEnd}
            minDate={dateStart}
          />
        </div>
        <hr />
        <div className='form-group'>
          <label>Titulo y notas</label>
          <input
            type='text'
            className={`form-control ${titleValid ? 'is-valid' : 'is-invalid'}`}
            placeholder='Título del evento'
            name='title'
            autoComplete='off'
            value={title}
            onChange={handleInputChange}
          />
          <small id='emailHelp' className='form-text text-muted'>Una descripción corta</small>
        </div>
        <div className='form-group'>
          <textarea
            type='text'
            className='form-control'
            placeholder='Notas'
            rows='5'
            name='notes'
            value={notes}
            onChange={handleInputChange}
          ></textarea>
          <small id='emailHelp' className='form-text text-muted'>Información adicional</small>
        </div>
        <button
          type='submit'
          className='btn btn-outline-primary btn-block'
        >
          <i className='far fa-save'></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
}

