import React from 'react';
import { blue700 } from 'material-ui/styles/colors';

const Estimation = ({ estimation }) => {
  const style = {
    color: blue700,
    MozUserSelect: 'none', /* Firefox */
    MsUserSelect: 'none', /* Internet Explorer */
    KhtmlUserSelect: 'none', /* KHTML browsers (e.g. Konqueror) */
    WebkitUserSelect: 'none', /* Chrome, Safari, and Opera */
    WebkitTouchCallout: 'none', /* Disable Android and iOS callouts */
  };
  return (
    <small className="Estimation" style={style}>{estimation} min</small>
  );
};

export default Estimation;
