import React, { Component } from 'react';

class Circle extends Component {
  render() {
    return (
      <p className="Circle" style={{ color: this.props.color }}>&#9679;</p>
    );
  }
}

export default Circle;
