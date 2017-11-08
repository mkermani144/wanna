/* eslint-env browser */

import React, { Component } from 'react';
import { SpeedDial, SpeedDialItem } from 'react-mui-speeddial';
import Add from 'material-ui/svg-icons/content/add';
import Close from 'material-ui/svg-icons/navigation/close';
import Done from 'material-ui/svg-icons/action/done';
import LightbulbOutline from 'material-ui/svg-icons/action/lightbulb-outline';
import { green600, yellow800 } from 'material-ui/styles/colors';
import shortid from 'shortid';
import { HotKeys } from 'react-hotkeys';

import NewTaskDialog from './NewTaskDialog';
import NewIdeaDialog from './NewIdeaDialog';
import './FAB.css';


class FAB extends Component {
  constructor() {
    super();
    this.state = {
      taskDialogOpen: false,
      ideaDialogOpen: false,
    };
    this.keyMap = {
      addNewIdea: 'ctrl+i',
      addNewTask: 'ctrl+t',
    };
  }
  handleRequestClose = () => {
    this.setState({
      taskDialogOpen: false,
      ideaDialogOpen: false,
    });
  }
  handleRequestTaskDialogOpen = () => {
    this.setState({
      taskDialogOpen: true,
    });
  }
  handleRequestIdeaDialogOpen = () => {
    this.setState({
      ideaDialogOpen: true,
    });
  }
  handleRequestTaskAdd = (taskInfo) => {
    const repetitionDays = taskInfo.repetition * taskInfo.repetitionValue;
    const id = shortid.generate();
    this.props.addTask({
      task: taskInfo.task,
      start: taskInfo.start,
      end: taskInfo.end,
      estimation: taskInfo.estimation * taskInfo.estimationValue,
      repetition: repetitionDays,
      done: false,
      id,
    });
  }
  handleRequestIdeaAdd = (ideaInfo) => {
    const id = shortid.generate();
    this.props.addIdea({
      idea: ideaInfo.idea,
      id,
    });
  }
  render() {
    const styles = {
      speedDial: {
        position: 'absolute',
        right: 24,
        bottom: this.props.fabRaised && this.props.width < 768 ? 72 : 24,
        zIndex: 1000,
        transition: 'bottom 400ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
      },
      newTask: {
        color: green600,
      },
      newIdea: {
        color: yellow800,
      },
    };
    const handlers = {
      addNewIdea: this.handleRequestIdeaDialogOpen,
      addNewTask: this.handleRequestTaskDialogOpen,
    };
    return (
      <HotKeys
        focused
        attach={this.props.window}
        keyMap={this.keyMap}
        handlers={handlers}
      >
        <SpeedDial
          className="SpeedDial"
          fabContentOpen={<Add />}
          fabContentClose={<Close />}
          fabProps={{ className: 'SpeedDial' }}
          style={styles.speedDial}
        >
          <SpeedDialItem
            fabContent={<Done />}
            label="Task"
            onTouchTap={this.handleRequestTaskDialogOpen}
          />
          <SpeedDialItem
            fabContent={<LightbulbOutline />}
            label="Idea"
            onTouchTap={this.handleRequestIdeaDialogOpen}
          />
          <NewTaskDialog
            open={this.state.taskDialogOpen}
            onRequestClose={this.handleRequestClose}
            onRequestAdd={this.handleRequestTaskAdd}
            calendarSystem={this.props.calendarSystem}
            firstDayOfWeek={this.props.firstDayOfWeek}
          />
          <NewIdeaDialog
            open={this.state.ideaDialogOpen}
            onRequestClose={this.handleRequestClose}
            onRequestAdd={this.handleRequestIdeaAdd}
          />
        </SpeedDial>
      </HotKeys>
    );
  }
}

export default FAB;
