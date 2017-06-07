import React, { Component } from 'react';

import Circle from './Circle';
import Estimation from './Estimation';
import DueDate from './DueDate';
import Repeat from './Repeat';
import Actions from './Actions';

import './Task.css';

class Task extends Component {
  render() {
    const {
      color,
      text,
      estimation,
      due,
      repeat,
    } = this.props;
    return (
      <div className="Task">
        <Circle color={color} />
        <p>{text}</p>
        <Estimation estimation={estimation} />
        <DueDate due={due}/>
        <Repeat repeat={repeat}/>
        <Actions />
      </div>
    );
  }
}

export default Task;
