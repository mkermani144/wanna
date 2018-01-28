import React, { Component } from 'react';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Snackbar from 'material-ui/Snackbar';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import {
  red500,
  green500,
  blue500,
  purple500,
} from 'material-ui/styles/colors';

import Task from './Task';
import EditTaskDialog from './EditTaskDialog';
import classify from './lib/classify';
import cumulate from './lib/cumulate';
import './TaskList.css';
import './Animations.css';

class TaskList extends Component {
  constructor() {
    super();
    this.state = {
      taskDialogOpen: false,
      snackbarOpen: false,
      snackbarMessage: '',
      index: -1,
      current: 5,
    };
  }
  componentDidMount = () => {
    this.interval = setInterval(() => this.renderMore(), 0);
  }
  componentWillUnmount = () => {
    clearInterval(this.interval);
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
  handleRequestTaskDelete = (index) => {
    this.props.deleteTask(index);
  }
  handleRequestTaskDo = (index) => {
    this.props.doTask(index);
  }
  handleRequestSnackbarOpen = (message) => {
    this.setState({
      snackbarOpen: true,
      snackbarMessage: message,
    });
    this.props.raiseFab();
  }
  handleRequestSnackbarClose = () => {
    this.setState({
      snackbarOpen: false,
      snackbarMessage: '',
    });
    this.props.lowerFab();
  }
  handleUndo = () => {
    this.props.undo();
    this.handleRequestSnackbarClose();
  }
  renderMore = () => {
    if (this.state.current === this.props.tasks.length - 1) {
      clearInterval(this.interval);
    } else {
      this.setState(prev => ({ current: prev.current + 1 }));
    }
  }
  render() {
    const styles = {
      overdue: {
        color: red500,
        marginTop: 20,
        cursor: 'default',
      },
      open: {
        color: green500,
        marginTop: 20,
        cursor: 'default',
      },
      notYet: {
        color: blue500,
        marginTop: 20,
        cursor: 'default',
      },
      done: {
        color: purple500,
        marginTop: 20,
        cursor: 'default',
      },
    };
    const classifiedTasks = classify(this.props.tasks);
    const marginStyles = {
      expanded: {
        marginLeft: 200,
      },
      mini: {
        marginLeft: 56,
      },
    };
    const dividerStyle = {
      marginTop: 12,
    };

    const cumulativeFrequencies = cumulate(classifiedTasks);
    return (
      <div
        className="TaskList"
        style={
          this.props.sidebarExpanded ?
          marginStyles.expanded :
          marginStyles.mini
        }
      >
        <CSSTransitionGroup
          className="transition-container"
          transitionName="tasks-empty-state"
          transitionEnterTimeout={170}
          transitionLeaveTimeout={150}
        >
          {!this.props.tasks.length &&
            <div
              className="tasks-empty-state"
            >
              <h1>
                All done
              </h1>
              <h4>
                You have no tasks
              </h4>
            </div>
          }
        </CSSTransitionGroup>
        <CSSTransitionGroup
          transitionName="task-header"
          transitionEnterTimeout={170}
          transitionLeaveTimeout={150}
        >
          {this.props.tasks.length &&
            <Subheader style={styles.overdue}>Overdue ({classifiedTasks.overdue.length})</Subheader>
          }
        </CSSTransitionGroup>
        <CSSTransitionGroup
          transitionName="task"
          transitionEnterTimeout={170}
          transitionLeaveTimeout={150}
        >
          {
            classifiedTasks.overdue.map((task, index) => (index > this.state.current ?
              <div key={task.id} className="Task" /> :
              <Task
                color={task.color}
                signal={task.signal}
                text={task.task}
                estimation={task.estimation}
                repeat={`${task.repetition} days`}
                key={task.id}
                index={task.index}
                onRequestEditTaskOpen={this.handleRequestTaskDialogOpen}
                onRequestDelete={this.handleRequestTaskDelete}
                onRequestDo={this.handleRequestTaskDo}
                onRequestSnackbar={this.handleRequestSnackbarOpen}
              />
            ))
          }
        </CSSTransitionGroup>
        <CSSTransitionGroup
          transitionName="task-divider"
          transitionEnterTimeout={170}
          transitionLeaveTimeout={150}
        >
          {this.props.tasks.length &&
            <Divider style={dividerStyle} />
          }
        </CSSTransitionGroup>
        <CSSTransitionGroup
          transitionName="task-header"
          transitionEnterTimeout={170}
          transitionLeaveTimeout={150}
        >
          {this.props.tasks.length &&
            <Subheader style={styles.open}>Open ({classifiedTasks.open.length})</Subheader>
          }
        </CSSTransitionGroup>
        <CSSTransitionGroup
          transitionName="task"
          transitionEnterTimeout={170}
          transitionLeaveTimeout={150}
        >
          {
            classifiedTasks.open.map((task, index) =>
              (index > this.state.current + cumulativeFrequencies.open ?
                <div key={task.id} className="Task" /> :
                <Task
                  color={task.color}
                  signal={task.signal}
                  text={task.task}
                  estimation={task.estimation}
                  due={task.due}
                  repeat={`${task.repetition} days`}
                  key={task.id}
                  index={task.index}
                  onRequestEditTaskOpen={this.handleRequestTaskDialogOpen}
                  onRequestDelete={this.handleRequestTaskDelete}
                  onRequestDo={this.handleRequestTaskDo}
                  onRequestSnackbar={this.handleRequestSnackbarOpen}
                />
            ))
          }
        </CSSTransitionGroup>
        <CSSTransitionGroup
          transitionName="task-divider"
          transitionEnterTimeout={170}
          transitionLeaveTimeout={150}
        >
          {this.props.tasks.length &&
            <Divider style={dividerStyle} />
          }
        </CSSTransitionGroup>
        <CSSTransitionGroup
          transitionName="task-header"
          transitionEnterTimeout={170}
          transitionLeaveTimeout={150}
        >
          {this.props.tasks.length && this.props.showNotYetTasks &&
            <Subheader style={styles.notYet}>Not Yet ({classifiedTasks.notYet.length})</Subheader>
          }
        </CSSTransitionGroup>
        <CSSTransitionGroup
          transitionName="task"
          transitionEnterTimeout={170}
          transitionLeaveTimeout={150}
        >
          {this.props.showNotYetTasks &&
            classifiedTasks.notYet.map((task, index) =>
              (index > this.state.current + cumulativeFrequencies.notYet ?
                <div key={task.id} className="Task" /> :
                <Task
                  color={task.color}
                  signal={task.signal}
                  text={task.task}
                  estimation={task.estimation}
                  due={task.due}
                  repeat={`${task.repetition} days`}
                  key={task.id}
                  index={task.index}
                  onRequestEditTaskOpen={this.handleRequestTaskDialogOpen}
                  onRequestDelete={this.handleRequestTaskDelete}
                  onRequestDo={this.handleRequestTaskDo}
                  onRequestSnackbar={this.handleRequestSnackbarOpen}
                />
            ))
          }
        </CSSTransitionGroup>
        <CSSTransitionGroup
          transitionName="task-divider"
          transitionEnterTimeout={170}
          transitionLeaveTimeout={150}
        >
          {this.props.tasks.length && this.props.showNotYetTasks &&
            <Divider style={dividerStyle} />
          }
        </CSSTransitionGroup>
        <CSSTransitionGroup
          transitionName="task-header"
          transitionEnterTimeout={170}
          transitionLeaveTimeout={150}
        >
          {this.props.tasks.length &&
            <Subheader style={styles.done}>Done ({classifiedTasks.done.length})</Subheader>
          }
        </CSSTransitionGroup>
        <CSSTransitionGroup
          transitionName="task"
          transitionEnterTimeout={170}
          transitionLeaveTimeout={150}
        >
          {
            classifiedTasks.done.map((task, index) =>
              (index > this.state.current + cumulativeFrequencies.done ?
                <div key={task.id} className="Task" /> :
                <Task
                  color={task.color}
                  signal={task.signal}
                  text={task.task}
                  estimation={task.estimation}
                  repeat={`${task.repetition} days`}
                  key={task.id}
                  index={task.index}
                  onRequestDelete={this.handleRequestTaskDelete}
                  onRequestSnackbar={this.handleRequestSnackbarOpen}
                  done
                />
            ))
          }
        </CSSTransitionGroup>
        <CSSTransitionGroup
          transitionName="task-divider"
          transitionEnterTimeout={170}
          transitionLeaveTimeout={150}
        >
          {this.props.tasks.length &&
            <Divider style={dividerStyle} />
          }
        </CSSTransitionGroup>
        <EditTaskDialog
          onRequestClose={this.handleRequestTaskDialogClose}
          onRequestEdit={this.handleRequestTaskEdit}
          task={this.props.tasks[this.state.index] ?
            this.props.tasks[this.state.index].task :
            null
          }
          open={this.state.taskDialogOpen}
        />
        <Snackbar
          open={this.state.snackbarOpen}
          message={this.state.snackbarMessage}
          autoHideDuration={3000}
          action="undo"
          onActionClick={this.handleUndo}
          onRequestClose={this.handleRequestSnackbarClose}
        />
      </div>
    );
  }
}

export default TaskList;
