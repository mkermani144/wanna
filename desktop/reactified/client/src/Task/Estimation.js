import React, { Component } from 'react';

import { blue700 } from 'material-ui/styles/colors';

class Estimation extends Component {
  render() {
    const style = {
      color: blue700,
    };
    return (
      <small className="Estimation" style={style}>{this.props.estimation} min</small>
    );
  }
}

export default Estimation;
