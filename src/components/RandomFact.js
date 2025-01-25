import React, { useState, useEffect } from 'react';

const RandomFact = () => {
  const [fact, setFact] = useState('');

  useEffect(() => {
    fetchRandomFact();
  }, []);

  const fetchRandomFact = async () => {
    try {
      const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
      const data = await response.json();
      setFact(data.text);
    } catch (error) {
      console.error('Error fetching random fact:', error);
    }
  };

  return (
    <div id="RandomFact">
       {fact}
    </div>
  );
};

export default RandomFact;