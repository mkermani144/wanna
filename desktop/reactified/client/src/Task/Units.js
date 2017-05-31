import React, { Component } from 'react';

class Units extends Component {
  render() {
    return (
      <small className="Units">{this.props.units} units</small>
    );
  }
}

export default Units;
