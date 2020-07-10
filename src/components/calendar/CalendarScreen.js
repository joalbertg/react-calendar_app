import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import {
  Navbar,
  AddNewFab
} from '~components/ui';
import { messages } from '~helpers/calendar-messages-es';
import {
  uiOpenModal,
  eventSetActive
} from '~actions';

import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';

moment.locale('es');

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = momentLocalizer(moment) // or globalizeLocalizer
const events = [{
  id: 'ABCD1234',
  title: 'Random Birthday',
  start: moment().toDate(),
  end: moment().add(2, 'hours').toDate(),
  notes: 'buy the cake',
  user: {
    _id: '123',
    name: 'Joalbert'
  }
}];

const CalendarScreen = () => {
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');
  const dispatch = useDispatch();
  const onDoubleClick = event => {
    dispatch(uiOpenModal());
  }

  const onSelect = event => {
    dispatch(eventSetActive(event.id));
  }

  const onViewChange = event => {
    //console.log(event);
    setLastView(event);
    localStorage.setItem('lastView', event);
  }

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: '#367cf7',
      borderRadius: 0,
      opacity: 0.8,
      display: 'block',
      color: 'white'
    };

    //console.log(event, start, end, isSelected);
    return {
      style
    };
  };

  return(
    <div className='calendar-screen'>
      <Navbar />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor='start'
        endAccessor='end'
        messages={messages}
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChange}
        view={lastView}
        components={{
          event: CalendarEvent
        }}
      />
      <AddNewFab />
      <CalendarModal />
    </div>
  );
}

export default CalendarScreen;

