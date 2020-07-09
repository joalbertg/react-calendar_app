import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Navbar } from '~components/ui/Navbar';
import { messages } from '~helpers/calendar-messages-es';

moment.locale('es');

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = momentLocalizer(moment) // or globalizeLocalizer
const events = [{
  title: 'Random Birthday',
  start: moment().toDate(),
  end: moment().add(2, 'hours').toDate(),
  bgcolor: '#fafafa',
  notes: 'buy the cake'
}];

const CalendarScreen = () => {
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
      />
    </div>
  );
}

export default CalendarScreen;

