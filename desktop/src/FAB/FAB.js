import React, { PureComponent } from 'react';
import { SpeedDial, SpeedDialItem } from 'react-mui-speeddial';
import Add from 'material-ui/svg-icons/content/add';
import Close from 'material-ui/svg-icons/navigation/close';
import Done from 'material-ui/svg-icons/action/done';
import LightbulbOutline from 'material-ui/svg-icons/action/lightbulb-outline';
import { green600, yellow800 } from 'material-ui/styles/colors';
import shortid from 'shortid';

import NewTaskDialog from './NewTaskDialog';
import NewIdeaDialog from './NewIdeaDialog';


class FAB extends PureComponent {
  constructor() {
    super();
    this.state = {
      taskDialogOpen: false,
      ideaDialogOpen: false,
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
    let offset = 0;
    if (this.props.calendarSystem === 'fa-IR') {
      offset = 56429000;
    }
    this.props.addTask({
      task: taskInfo.task,
      start: taskInfo.start - offset,
      end: (taskInfo.end + 86400000) - offset,
      estimation: taskInfo.estimation * taskInfo.estimationValue,
      repetition: repetitionDays,
      done: false,
      id,
    });
    this.handleRequestClose();
  }
  handleRequestIdeaAdd = (ideaInfo) => {
    const id = shortid.generate();
    this.props.addIdea({
      idea: ideaInfo.idea,
      id,
    });
    this.handleRequestClose();
  }
  render() {
    const styles = {
      speedDial: {
        position: 'absolute',
        right: '20px',
        bottom: '20px',
        zIndex: 1000,
      },
      newTask: {
        color: green600,
      },
      newIdea: {
        color: yellow800,
      },
    };
    return (
      <SpeedDial
        className="SpeedDial"
        fabContentOpen={<Add />}
        fabContentClose={<Close />}
        style={styles.speedDial}
      >
        <SpeedDialItem
          fabContent={<Done />}
          onTouchTap={this.handleRequestTaskDialogOpen}
        />
        <SpeedDialItem
          fabContent={<LightbulbOutline />}
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
    );
  }
}

export default FAB;
