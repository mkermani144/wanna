import React, { Component } from 'react';

import Subheader from 'material-ui/Subheader';

import {
  red500,
  green500,
  blue500
} from 'material-ui/styles/colors';

import TaskContainer from './TaskContainer';

import './TaskList.css';

import classify from '../lib/classify';

class TaskList extends Component {
  render() {
    const styles = {
      overdue: {
        color: red500,
        marginTop: 20,
      },
      open: {
        color: green500,
        marginTop: 20,
      },
      notYet: {
        color: blue500,
        marginTop: 20,
      },
    };
    const classifiedTasks = classify(this.props.tasks);
    return (
      <div className="TaskList">
        {classifiedTasks.overdue.length > 0 &&
          <Subheader style={styles.overdue}>Overdue</Subheader>
        }
        {
          classifiedTasks.overdue.map(task => {
            return (
              <TaskContainer
                color={task.color}
                text={task.task}
                estimation={task.estimation}
                repeat={`${task.repetition} days`}
              />
            );
          })
        }
        {classifiedTasks.open.length > 0 &&
          <Subheader style={styles.open}>Open</Subheader>
        }
        {
          classifiedTasks.open.map(task => {
            return (
              <TaskContainer
                color={task.color}
                text={task.task}
                estimation={task.estimation}
                due={task.due}
                repeat={`${task.repetition} days`}
              />
            );
          })
        }
        {classifiedTasks.notYet.length > 0 &&
          <Subheader style={styles.notYet}>Not Yet</Subheader>
        }
        {
          classifiedTasks.notYet.map(task => {
            return (
              <TaskContainer
                color={task.color}
                text={task.task}
                estimation={task.estimation}
                repeat={`${task.repetition} days`}
              />
            );
          })
        }
      </div>
    );
  }
}

export default TaskList;
