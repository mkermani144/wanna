import React, { Component } from 'react';

import Circle from './Circle';
import Estimation from './Estimation';
import DueDate from './DueDate';
import Repeat from './Repeat';
import Actions from './Actions';

import './Task.css';

class Task extends Component {
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
          this.props.onRequestSnackbar('Task deleted');
        });
      }, 1000);
    });
  }
  render() {
    const {
      color,
      text,
      estimation,
      due,
      repeat,
    } = this.props;
    return (
      <div className={`Task ${this.state.class}`}>
        <Circle color={color} />
        <p>{text}</p>
        <Estimation estimation={estimation} />
        <DueDate due={due}/>
        <Repeat repeat={repeat}/>
        <Actions
          onRequestEditDialogOpen={() => this.props.onRequestEditTaskOpen(this.props.index)}
          onRequestDelete={this.handleRequestDelete}
        />
      </div>
    );
  }
}

export default Task;
