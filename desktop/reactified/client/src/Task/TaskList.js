import React, { Component } from 'react';

import Subheader from 'material-ui/Subheader';

import {
  red500,
  green500,
  blue500
} from 'material-ui/styles/colors';

import Task from './Task';

import EditTaskDialog from './EditTaskDialog';

import './TaskList.css';

import classify from '../lib/classify';

class TaskList extends Component {
  constructor() {
    super();
    this.state = {
      taskDialogOpen: false,
    }
  }
  handleRequestTaskDialogClose = () => {
    this.setState({
      taskDialogOpen: false,
    });
  }
  handleRequestTaskDialogOpen = (index) => {
    this.setState({
      taskDialogOpen: true,
      index,
    });
  }
  handleRequestTaskEdit = (taskInfo) => {
    this.props.editTask(this.state.index, {
      task: taskInfo.task,
    });
    this.handleRequestTaskDialogClose();
  }
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
          classifiedTasks.overdue.map((task, index) => {
            return (
              <Task
                color={task.color}
                text={task.task}
                estimation={task.estimation}
                repeat={`${task.repetition} days`}
                key={index}
                index={index}
                onRequestEditTaskOpen={this.handleRequestTaskDialogOpen}
              />
            );
          })
        }
        {classifiedTasks.open.length > 0 &&
          <Subheader style={styles.open}>Open</Subheader>
        }
        {
          classifiedTasks.open.map((task, index) => {
            return (
              <Task
                color={task.color}
                text={task.task}
                estimation={task.estimation}
                due={task.due}
                repeat={`${task.repetition} days`}
                key={index}
                index={index}
                onRequestEditTaskOpen={this.handleRequestTaskDialogOpen}
              />
            );
          })
        }
        {classifiedTasks.notYet.length > 0 &&
          <Subheader style={styles.notYet}>Not Yet</Subheader>
        }
        {
          classifiedTasks.notYet.map((task, index) => {
            return (
              <Task
                color={task.color}
                text={task.task}
                estimation={task.estimation}
                repeat={`${task.repetition} days`}
                key={index}
                index={index}
                onRequestEditTaskOpen={this.handleRequestTaskDialogOpen}
              />
            );
          })
        }
        <EditTaskDialog
          onRequestClose={this.handleRequestTaskDialogClose}
          onRequestEdit={this.handleRequestTaskEdit}
          task={this.props.tasks[this.state.index] ?
            this.props.tasks[this.state.index].task :
            null
          }
          open={this.state.taskDialogOpen}
        />
      </div>
    );
  }
}

export default TaskList;
