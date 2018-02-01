/* eslint-env browser */

import React, { Component } from 'react';
// import { SpeedDial, SpeedDialItem } from 'react-mui-speeddial';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Add from 'material-ui/svg-icons/content/add';
import Done from 'material-ui/svg-icons/action/done';
import LightbulbOutline from 'material-ui/svg-icons/action/lightbulb-outline';
import { green600, yellow800 } from 'material-ui/styles/colors';
import shortid from 'shortid';
import { HotKeys } from 'react-hotkeys';

import NewTaskDialog from './NewTaskDialog';
import NewIdeaDialog from './NewIdeaDialog';
import calculateBottom from './lib/calculateBottom';

import {
  FABRaiseWindowWidthTreshold,
  FABBottom,
  FABRaisedBottom,
  FABMiniRaisedBottomClosed,
  FABRight,
  FABMiniRight,
} from '../lib/constants';


class FAB extends Component {
  state = {
    taskDialogOpen: false,
    ideaDialogOpen: false,
    FABOpen: false,
  };
  keyMap = {
    addNewIdea: 'ctrl+i',
    addNewTask: 'ctrl+t',
  };

  handleToggleFAB = () => {
    this.setState(prev => ({
      FABOpen: !prev.FABOpen,
    }));
  }
  handleRequestClose = () => {
    this.setState({
      taskDialogOpen: false,
      ideaDialogOpen: false,
    });
  }
  handleRequestTaskDialogOpen = () => {
    this.setState({
      FABOpen: false,
      taskDialogOpen: true,
    });
  }
  handleRequestIdeaDialogOpen = () => {
    this.setState({
      FABOpen: false,
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
      plusFAB: {
        position: 'absolute',
        right: FABRight,
        bottom: this.props.FABRaised && this.props.width < FABRaiseWindowWidthTreshold ?
          FABRaisedBottom :
          FABBottom,
        transform: this.state.FABOpen ? 'rotate(45deg)' : 'rotate(0)',
        zIndex: 1000,
        transition: 'all 400ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
      },
      doneFAB: {
        position: 'absolute',
        right: FABMiniRight,
        bottom: this.props.FABRaised && this.props.width < FABRaiseWindowWidthTreshold ?
          FABMiniRaisedBottomClosed :
          calculateBottom(this.state.FABOpen, 0),
        opacity: this.state.FABOpen ? 1 : 0,
        zIndex: 999,
        transition: 'all 400ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
      },
      lightbulbFAB: {
        position: 'absolute',
        right: FABMiniRight,
        bottom: this.props.FABRaised && this.props.width < FABRaiseWindowWidthTreshold ?
          FABMiniRaisedBottomClosed :
          calculateBottom(this.state.FABOpen, 1),
        opacity: this.state.FABOpen ? 1 : 0,
        zIndex: 999,
        transition: 'all 400ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
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
        <FloatingActionButton
          id="plus-fab"
          style={styles.plusFAB}
          onClick={this.handleToggleFAB}
        >
          <Add />
        </FloatingActionButton>
        <FloatingActionButton
          id="done-fab"
          style={styles.doneFAB}
          backgroundColor={green600}
          mini
          onClick={this.handleRequestTaskDialogOpen}
        >
          <Done />
        </FloatingActionButton>
        <FloatingActionButton
          id="lightbulb-fab"
          style={styles.lightbulbFAB}
          backgroundColor={yellow800}
          mini
          onClick={this.handleRequestIdeaDialogOpen}
        >
          <LightbulbOutline />
        </FloatingActionButton>
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
      </HotKeys>
    );
  }
}

export default FAB;
