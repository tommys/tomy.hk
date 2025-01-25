// src/components/F1CombinedPage.js
import React, { useEffect, useState } from 'react';

const F1CombinedPage = () => {
  const [races, setRaces] = useState([]);
  const [standings, setStandings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchF1Data = async () => {
      const calendarUrl = 'https://ergast.com/api/f1/current.json';
      const standingsUrl = 'https://ergast.com/api/f1/2023/driverStandings.json';

      try {
        const calendarResponse = await fetch(calendarUrl);
        const calendarResult = await calendarResponse.json();
        setRaces(calendarResult.MRData.RaceTable.Races);

        const standingsResponse = await fetch(standingsUrl);
        const standingsResult = await standingsResponse.json();
        setStandings(standingsResult.MRData.StandingsTable.StandingsLists[0].DriverStandings);

        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchF1Data();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Current F1 Calendar</h1>
      <table>
        {/* ... your existing table structure for races */}
      </table>

      <h1>2023 F1 Driver Standings</h1>
      <table>
        {/* ... your existing table structure for standings */}
      </table>
    </div>
  );
};

export default F1CombinedPage;