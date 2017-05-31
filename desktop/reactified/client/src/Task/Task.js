import React, { Component } from 'react';

import Circle from './Circle';
import Units from './Units';
import DueDate from './DueDate';
import Repeat from './Repeat';
import Actions from './Actions';

import './Task.css';

class Task extends Component {
  render() {
    const {
      color,
      text,
      units,
      due,
      repeat,
    } = this.props;
    return (
      <div className="Task">
        <Circle color={color} />
        <p>{text}</p>
        <Units units={units} />
        <DueDate due={due}/>
        <Repeat repeat={repeat}/>
        <Actions />
      </div>
    );
  }
}

export default Task;
