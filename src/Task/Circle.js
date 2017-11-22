import React from 'react';

const Circle = ({ color, signal }) => (
  <div className="Circle" style={{ backgroundColor: color }}>
    {signal && <div className="Signal" style={{ borderColor: color }} />}
  </div>
);

export default Circle;
