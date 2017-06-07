import React, { Component } from 'react';

import Actions from './Actions';

import './Idea.css';

class Idea extends Component {
  render() {
    return (
      <div className="Idea">
        <p>{this.props.text}</p>
        <Actions
          onRequestEditDialogOpen={() => this.props.onRequestEditDialogOpen(this.props.index)}
        />
      </div>
    );
  }
}

export default Idea;
