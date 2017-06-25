import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { green600, grey50 } from 'material-ui/styles/colors';

import './ConvertIdeaDialog.css';

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
  buttonDisabled = () => !(
    this.state.task
    && this.state.period
    && this.state.estimation
    && /^[0-9]*$/.test(this.state.period)
    && /^[0-9]*$/.test(this.state.start)
    && /^[0-9]*$/.test(this.state.estimation)
    && /^[0-9]*$/.test(this.state.repetition)
  );
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
  handleRequestConvert = () => {
    this.props.onRequestConvert(this.state);
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
  handleRequestFinish = () => {
    this.props.onRequestConvert(this.state);
    this.props.onRequestDelete();
    this.props.onRequestClose();
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
        label="Add and finish"
        primary
        disabled={this.buttonDisabled()}
        onTouchTap={this.handleRequestFinish}
      />,
      <FlatButton
        label="Add and continue"
        primary
        disabled={this.buttonDisabled()}
        onTouchTap={this.handleRequestConvert}
      />,
      <FlatButton
        label="Cancel"
        primary
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
          title="Convert idea"
          actions={actions}
          titleStyle={dialogTitleStyle}
          open={this.props.open}
          onRequestClose={this.props.onRequestClose}
        >
          <br />
          Converting idea: {this.props.idea}
          <br />
          <div className="textfields">
            <TextField
              floatingLabelText="Task title"
              fullWidth
              underlineFocusStyle={textFieldStyles.underlineFocusStyle}
              floatingLabelFocusStyle={textFieldStyles.floatingLabelFocusStyle}
              onChange={this.handleTaskChange}
              autoFocus
              value={this.state.task}
            />
            <div className="row">
              <TextField
                floatingLabelText="Period         "
                underlineFocusStyle={textFieldStyles.underlineFocusStyle}
                floatingLabelFocusStyle={textFieldStyles.floatingLabelFocusStyle}
                onChange={this.handlePeriodChange}
                value={this.state.period}
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
                value={this.state.start}
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
                value={this.state.estimation}
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
                value={this.state.repetition}
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
