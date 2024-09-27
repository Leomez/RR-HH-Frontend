import React from 'react';

const ClockHand = ({ angle, length, width, color, center }) => {
  const x2 = center + length * Math.cos(Math.PI / 2 - (angle * Math.PI) / 180);
  const y2 = center - length * Math.sin(Math.PI / 2 - (angle * Math.PI) / 180);

  return (
    <line
      x1={center} y1={center}
      x2={x2} y2={y2}
      stroke={color} strokeWidth={width}
    />
  );
};

export default ClockHand;
