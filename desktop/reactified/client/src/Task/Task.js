import React, { Component } from 'react';

import Diamond from './Diamond';
import Units from './Units';
import DueDate from './DueDate';
import Repeat from './Repeat';
import Actions from './Actions';

import './Task.css';

class Task extends Component {
  render() {
    return (
      <div className="Task">
        <Diamond color='red' />
        <p>Sample task</p>
        <Units units={120} />
        <DueDate />
        <Repeat repeat={'2 days'}/>
        <Actions />
      </div>
    );
  }
}

export default Task;
