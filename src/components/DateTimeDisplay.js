import React, { useState, useEffect } from 'react';

const DateTimeDisplay = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  const formatDate = (date) => {
    const options = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return date.toLocaleDateString('en-HK', options);
  };

  const formatTime = (date) => {
    const options = {
      hour: '2-digit',
      minute: '2-digit',
    };
    return date.toLocaleTimeString('en-HK', options);
  };

  return (
    <>
      <div id="DateTimeDisplay">
        <div className="dateDisplay">{formatDate(currentDateTime)}</div>
        <div>|</div>
        <div className="timeDisplay">{formatTime(currentDateTime)}</div>
      </div>
    </>
  );
};

export default DateTimeDisplay;