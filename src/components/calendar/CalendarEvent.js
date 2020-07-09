import React from 'react';

export const CalendarEvent = ({ event }) => {
  const { title, user: { name } } = event;

  return(
    <>
      <strong>{title}</strong>
      <span> - {name}</span>
    </>
  );
}

