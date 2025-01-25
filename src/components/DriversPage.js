// src/components/DriverStandingsPage.js
import React, { useEffect, useState } from 'react';

const DriverStandingsPage = () => {
  const [standings, setStandings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStandings = async () => {
      const url = 'https://ergast.com/api/f1/2023/driverStandings.json';

      try {
        const response = await fetch(url);
        const result = await response.json();
        setStandings(result.MRData.StandingsTable.StandingsLists[0].DriverStandings);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchStandings();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>2023 F1 Driver Standings</h1>
      <table>
        <thead>
          <tr>
            <th>Position</th>
            <th>Driver</th>
            <th>Points</th>
            <th>Wins</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((standing, index) => (
            <tr key={index}>
              <td>{standing.position}</td>
              <td>
                {standing.Driver.givenName} {standing.Driver.familyName}
              </td>
              <td>{standing.points}</td>
              <td>{standing.wins}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DriverStandingsPage;