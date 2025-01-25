import React, { useState, useEffect } from 'react';


const CounterOnRefresh = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const storedCount = localStorage.getItem('refreshCount');

    if (storedCount) {
      setCount(Number(storedCount) + 1);
      localStorage.setItem('refreshCount', Number(storedCount) + 1);
    } else {
      localStorage.setItem('refreshCount', 1);
      setCount(1);
    }
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div onClick={handleRefresh}>
        {count}
    </div>
  );
};

export default CounterOnRefresh;