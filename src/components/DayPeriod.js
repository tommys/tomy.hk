import React from 'react';

function getDayPeriod(currentTime) {
  const currentHour = currentTime.getHours();

  if (currentHour >= 5 && currentHour < 6) {
    return 'Very Early Morning';
  } else if (currentHour >= 6 && currentHour < 9) {
    return 'Early Morning';
  } else if (currentHour >= 9 && currentHour < 12) {
    return 'Late Morning';
  } else if (currentHour >= 12 && currentHour < 15) {
    return 'Early Afternoon';
  } else if (currentHour >= 15 && currentHour < 18) {
    return 'Late Afternoon';
  } else if (currentHour >= 18 && currentHour < 23) {
    return 'Early Evening';
  } else {
    return 'Night Vibes';
  }
}

const DayPeriod = () => {
  const currentTime = new Date();
  const dayPeriod = getDayPeriod(currentTime);

  return (
    <div id="dayPeriod">
      {dayPeriod}
    </div>
  );
};

export default DayPeriod;