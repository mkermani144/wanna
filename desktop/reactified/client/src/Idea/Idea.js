import React, { Component } from 'react';

import Actions from './Actions';

import './Idea.css';

class Idea extends Component {
  constructor() {
    super();
    this.state = {
      class: '',
    }
  }
  handleRequestDelete = () => {
    this.setState({
      class: 'will-be-deleted',
    }, () => {
      setTimeout(() => {
        this.setState({
          class: '',
        }, () => {
          this.props.onRequestDelete(this.props.index);
          this.props.onRequestSnackbar('Idea deleted');
        });
      }, 1000);
    });
  }
  render() {
    return (
      <div className={`Idea ${this.state.class}`}>
        <p>{this.props.text}</p>
        <Actions
          onRequestEditDialogOpen={() => this.props.onRequestEditDialogOpen(this.props.index)}
          onRequestDelete={this.handleRequestDelete}
        />
      </div>
    );
  }
}

export default Idea;
