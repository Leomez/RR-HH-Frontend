import React from 'react';

const ClockNumbers = ({ center, radius, size }) => {
  const fontSize = size * 0.09; // Calcula enl font size en funcion del tamaño del rejor
  const numbers = [
    { num: 12, x: center, y: center - radius + fontSize },
    { num: 3, x: center + radius - fontSize, y: center + fontSize / 3 },
    { num: 6, x: center, y: center + radius - fontSize / 3 },
    { num: 9, x: center - radius + fontSize, y: center + fontSize / 3 }
  ];

  return numbers.map(({ num, x, y }) => (
    
      <text  key={num} x={x} y={y} textAnchor="middle" alignmentBaseline='auto' fontSize={fontSize} fontFamily="Arial" fill="black">{num}</text>
    
  ));
};

export default ClockNumbers;
