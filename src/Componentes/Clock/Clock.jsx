import React, { useState, useEffect } from 'react';
import ClockFace from './ClockFace';

const Clock = ({ size = 200, padding = 10 }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  return (
    <div>
      <ClockFace hours={hours} minutes={minutes} seconds={seconds} size={size} padding={padding} />
    </div>
  );
};

export default Clock;
