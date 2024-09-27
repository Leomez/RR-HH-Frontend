import React from 'react';
import ClockNumbers from './ClockNumbers';
import ClockDots from './ClockDots';
import ClockHand from './ClockHand';

const ClockFace = ({ hours, minutes, seconds, size, padding }) => {
  const center = size / 2;
  const radius = center - padding;
  const hourAngle = (hours % 12) * 30 + minutes * 0.5;
  const minuteAngle = minutes * 6;
  const secondAngle = seconds * 6;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle style={{padding: '10px'}} cx={center} cy={center} r={radius} stroke="black" strokeWidth="4" fill="none" />
      <ClockNumbers center={center} radius={radius} size={size} />
      <ClockDots center={center} radius={radius} />
      <ClockHand angle={hourAngle} length={radius * 0.5} width={4} color="black" center={center} />
      <ClockHand angle={minuteAngle} length={radius * 0.7} width={2} color="black" center={center} />
      <ClockHand angle={secondAngle} length={radius * 0.9} width={1} color="red" center={center} />
      <circle cx={center} cy={center} r="3" fill="black" />
    </svg>
  );
};

export default ClockFace;

