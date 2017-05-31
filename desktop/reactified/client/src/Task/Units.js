import React, { Component } from 'react';

import { blue700 } from 'material-ui/styles/colors';

class Units extends Component {
  render() {
    const style = {
      color: blue700,
    };
    return (
      <small className="Units" style={style}>{this.props.units} units</small>
    );
  }
}

export default Units;
