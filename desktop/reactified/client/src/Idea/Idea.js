import React, { Component } from 'react';

import Actions from './Actions';

import './Idea.css';

class Idea extends Component {
  render() {
    return (
      <div className="Idea">
        <p>{this.props.text}</p>
        <Actions />
      </div>
    );
  }
}

export default Idea;
