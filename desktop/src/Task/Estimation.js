import React from 'react';
import { blue700 } from 'material-ui/styles/colors';

const Estimation = ({ estimation }) => {
  const style = {
    color: blue700,
  };
  return (
    <small className="Estimation" style={style}>{estimation} min</small>
  );
};

export default Estimation;
