import React, { PureComponent } from 'react';

import Circle from './Circle';
import Estimation from './Estimation';
import DueDate from './DueDate';
import Repeat from './Repeat';
import Actions from './Actions';
import './Task.css';

class Task extends PureComponent {
  state = { class: '' };

  handleRequestDelete = () => {
    this.props.onRequestDelete(this.props.index);
    this.props.onRequestSnackbar('Task deleted');
  }
  handleRequestDo = () => {
    this.props.onRequestDo(this.props.index);
    this.props.onRequestSnackbar('Task done');
  }
  render() {
    const {
      color,
      text,
      estimation,
      due,
      repeat,
      done,
      signal,
    } = this.props;
    return (
      <div className={`Task ${this.state.class} ${done ? 'done' : ''}`}>
        <Circle color={color} signal={signal} />
        <div className="text"><p>{text}</p></div>
        <Estimation estimation={estimation} />
        <DueDate due={due} />
        <Repeat repeat={repeat} />
        <Actions
          onRequestEditDialogOpen={() => this.props.onRequestEditTaskOpen(this.props.index)}
          onRequestDelete={this.handleRequestDelete}
          onRequestDo={this.handleRequestDo}
          done={done}
        />
      </div>
    );
  }
}

export default Task;
