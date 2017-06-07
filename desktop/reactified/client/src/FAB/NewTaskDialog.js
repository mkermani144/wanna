import React, { Component } from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import './NewTaskDialog.css';

class NewTaskDialog extends Component {
  constructor() {
    super();
    this.state = {
      periodValue: 1,
      startValue: 1,
      estimationValue: 1,
      repetitionValue: 1,
      task: '',
      period: '',
      start: '',
      estimation: '',
      repetition: '',
    };
  }
  handlePeriodMenuChange = (e, i, value) => {
    this.setState({
      periodValue: value,
    });
  }
  handleStartMenuChange = (e, i, value) => {
    this.setState({
      startValue: value,
    });
  }
  handleEstimationMenuChange = (e, i, value) => {
    this.setState({
      estimationValue: value,
    });
  }
  handleRepetitionMenuChange = (e, i, value) => {
    this.setState({
      repetitionValue: value,
    });
  }
  handleTaskChange = (e) => {
    this.setState({
      task: e.target.value,
    });
  }
  handlePeriodChange = (e) => {
    this.setState({
      period: e.target.value,
    });
  }
  handleStartChange = (e) => {
    this.setState({
      start: e.target.value,
    });
  }
  handleEstimationChange = (e) => {
    this.setState({
      estimation: e.target.value,
    });
  }
  handleRepetitionChange = (e) => {
    this.setState({
      repetition: e.target.value,
    });
  }
  handleRequestClose = () => {
    this.setState({
      periodValue: 1,
      startValue: 1,
      estimationValue: 1,
      repetitionValue: 1,
      task: '',
      period: '',
      start: '',
      estimation: '',
      repetition: '',
    });
    this.props.onRequestClose();
  }
  handleRequestAdd = () => {
    this.props.onRequestAdd(this.state);
    this.setState({
      periodValue: 1,
      startValue: 1,
      estimationValue: 1,
      repetitionValue: 1,
      task: '',
      period: '',
      start: '',
      estimation: '',
      repetition: '',
    });
  }
  render() {
    const actions = [
      <FlatButton
        label="Add"
        primary={true}
        disabled={!Boolean(this.state.task && this.state.period && this.state.estimation)}
        onTouchTap={this.handleRequestAdd}
      />,
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleRequestClose}
      />,
    ];
    return (
      <div className="NewTaskDialog">
        <Dialog
          title="Add new task"
          actions={actions}
          open={this.props.open}
          onRequestClose={this.props.onRequestClose}
        >
          What do you wanna do?
          <br />
          <div className="textfields">
            <TextField
              floatingLabelText="Task title"
              fullWidth={true}
              onChange={this.handleTaskChange}
            />
            <div className="row">
              <TextField
                floatingLabelText="Period         "
                onChange={this.handlePeriodChange}
              />
              <DropDownMenu
                value={this.state.periodValue}
                onChange={this.handlePeriodMenuChange}
              >
                <MenuItem value={1} primaryText="Days" />
                <MenuItem value={7} primaryText="Weeks" />
              </DropDownMenu>
            </div>
            <div className="row">
              <TextField
                floatingLabelText="Time to start"
                onChange={this.handleStartChange}
              />
              <DropDownMenu
                value={this.state.startValue}
                onChange={this.handleStartMenuChange}
              >
                <MenuItem value={1} primaryText="Days" />
                <MenuItem value={7} primaryText="Weeks" />
              </DropDownMenu>
            </div>
            <div className="row">
              <TextField
                floatingLabelText="Estimated time"
                onChange={this.handleEstimationChange}
              />
              <DropDownMenu
                value={this.state.estimationValue}
                onChange={this.handleEstimationMenuChange}
              >
                <MenuItem value={1} primaryText="Minutes" />
                <MenuItem value={60} primaryText="Hours" />
              </DropDownMenu>
            </div>
            <div className="row">
              <TextField
                floatingLabelText="Repetition period"
                onChange={this.handleRepetitionChange}
              />
              <DropDownMenu
                value={this.state.repetitionValue}
                onChange={this.handleRepetitionMenuChange}
              >
                <MenuItem value={1} primaryText="Days" />
                <MenuItem value={7} primaryText="Weeks" />
              </DropDownMenu>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default NewTaskDialog;
