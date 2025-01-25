import React, { useState, useEffect } from 'react';
import textLines from './textLines';

const getRandomText = (lines) => {
  const randomIndex = Math.floor(Math.random() * lines.length);
  return lines[randomIndex];
}

const RandomText = () => {
  const [randomText, setRandomText] = useState('');

  useEffect(() => {
    const text = getRandomText(textLines);
    setRandomText(text);
  }, []);

  return (
      <div dangerouslySetInnerHTML={{ __html: randomText }}></div>
  );
};

export default RandomText;