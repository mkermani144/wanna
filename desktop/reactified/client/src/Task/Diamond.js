import React, { Component } from 'react';

class Diamond extends Component {
  render() {
    return (
      <p className="Diamond" style={{ color: this.props.color }}>&#x25C6;</p>
    );
  }
}

export default Diamond;
