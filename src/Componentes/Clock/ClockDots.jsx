import React from 'react';

const ClockDots = ({ center, radius }) => {
  const dots = [];
  for (let i = 1; i <= 11; i++) {
    if ([3, 6, 9, 12].includes(i % 12)) continue;
    const angle = (i * 30) * (Math.PI / 180);
    const x = center + (radius - 10) * Math.cos(Math.PI / 2 - angle);
    const y = center - (radius - 10) * Math.sin(Math.PI / 2 - angle);
    dots.push(<circle key={i} cx={x} cy={y} r="1" fill="black" />);
  }
  return dots;
};

export default ClockDots;
