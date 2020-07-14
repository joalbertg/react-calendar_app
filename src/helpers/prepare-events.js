import moment from 'moment';

export const prepareEvents = (events = []) => {
  return events.map(event => prepareEvent(event));
}

export const prepareEvent = event => ({
  ...event,
  start: moment(event.start).toDate(),
  end: moment(event.end).toDate()
});

