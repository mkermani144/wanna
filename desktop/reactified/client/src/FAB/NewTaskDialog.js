import React, { Component } from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import { green600, grey50 } from 'material-ui/styles/colors';

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
  buttonDisabled = () => {
    return !Boolean(
      this.state.task
      && this.state.period
      && this.state.estimation
      && /^[0-9]*$/.test(this.state.period)
      && /^[0-9]*$/.test(this.state.start)
      && /^[0-9]*$/.test(this.state.estimation)
      && /^[0-9]*$/.test(this.state.repetition)
    );
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
        disabled={this.buttonDisabled()}
        onTouchTap={this.handleRequestAdd}
      />,
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleRequestClose}
      />,
    ];
    const dialogTitleStyle = {
      backgroundColor: green600,
      color: grey50,
    };
    const textFieldStyles = {
      underlineFocusStyle: {
        borderColor: green600,
      },
      floatingLabelFocusStyle: {
        color: green600,
      },
    };
    return (
      <div className="NewTaskDialog">
        <Dialog
          title="Add new task"
          actions={actions}
          open={this.props.open}
          onRequestClose={this.props.onRequestClose}
          titleStyle={dialogTitleStyle}
        >
          <br />
          What do you wanna do?
          <br />
          <div className="textfields">
            <TextField
              floatingLabelText="Task title"
              fullWidth={true}
              underlineFocusStyle={textFieldStyles.underlineFocusStyle}
              floatingLabelFocusStyle={textFieldStyles.floatingLabelFocusStyle}
              onChange={this.handleTaskChange}
              autoFocus
            />
            <div className="row">
              <TextField
                floatingLabelText="Period         "
                underlineFocusStyle={textFieldStyles.underlineFocusStyle}
                floatingLabelFocusStyle={textFieldStyles.floatingLabelFocusStyle}
                onChange={this.handlePeriodChange}
                errorText={
                  /^[0-9]*$/.test(this.state.period) ?
                  '' :
                  'Period should be a number'
                }
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
                underlineFocusStyle={textFieldStyles.underlineFocusStyle}
                floatingLabelFocusStyle={textFieldStyles.floatingLabelFocusStyle}
                onChange={this.handleStartChange}
                errorText={
                  /^[0-9]*$/.test(this.state.start) ?
                  '' :
                  'Time to start should be a number'
                }
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
                underlineFocusStyle={textFieldStyles.underlineFocusStyle}
                floatingLabelFocusStyle={textFieldStyles.floatingLabelFocusStyle}
                onChange={this.handleEstimationChange}
                errorText={
                  /^[0-9]*$/.test(this.state.estimation) ?
                  '' :
                  'Estimated time should be a number'
                }
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
                underlineFocusStyle={textFieldStyles.underlineFocusStyle}
                floatingLabelFocusStyle={textFieldStyles.floatingLabelFocusStyle}
                onChange={this.handleRepetitionChange}
                errorText={
                  /^[0-9]*$/.test(this.state.repetition) ?
                  '' :
                  'Repetition period should be a number'
                }
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
