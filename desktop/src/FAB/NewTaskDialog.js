import React, { PureComponent } from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { green600, grey50 } from 'material-ui/styles/colors';
import defaultUtils from 'material-ui/DatePicker/dateUtils';
import persianUtils from 'material-ui-persian-date-picker-utils';

import './NewTaskDialog.css';

class NewTaskDialog extends PureComponent {
  constructor() {
    super();
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    this.state = {
      estimationValue: 1,
      repetitionValue: 1,
      task: '',
      start: Date.parse(todayStart),
      end: 0,
      estimation: '',
      repetition: '',
    };
  }
  buttonDisabled = () => !(
    this.state.task
    && this.state.end
    && this.state.estimation
    && /^[0-9]*$/.test(this.state.estimation)
    && /^[0-9]*$/.test(this.state.repetition)
  );
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
  handleStartChange = (e, start) => {
    this.setState({
      start: Date.parse(start),
    });
  }
  handleEndChange = (e, end) => {
    this.setState({
      end: Date.parse(end),
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
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    this.setState({
      estimationValue: 1,
      repetitionValue: 1,
      task: '',
      start: Date.parse(todayStart),
      end: 0,
      estimation: '',
      repetition: '',
    });
    this.props.onRequestClose();
  }
  handleRequestAdd = () => {
    this.props.onRequestAdd(this.state);
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    this.setState({
      estimationValue: 1,
      repetitionValue: 1,
      task: '',
      start: Date.parse(todayStart),
      end: 0,
      estimation: '',
      repetition: '',
    });
  }
  handleRequestFinish = () => {
    this.handleRequestAdd();
    this.handleRequestClose();
  }
  disablePassed = date => Date.parse(date) < Date.now() - 86400000;
  disableEndBeforeStart = date => Date.parse(date) < this.state.start ||
                                  Date.parse(date) < Date.now() - 86400000;
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
        onTouchTap={this.handleRequestAdd}
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
    const datePickerStyles = {
      textFieldStyle: {
        flex: 1,
      },
    };
    const DateTimeFormat = global.Intl.DateTimeFormat;
    return (
      <div className="NewTaskDialog">
        <Dialog
          title="Add new task"
          actions={actions}
          titleStyle={dialogTitleStyle}
          open={this.props.open}
          onRequestClose={this.props.onRequestClose}
        >
          <br />
          What do you wanna do?
          <br />
          <div className="textfields">
            <TextField
              floatingLabelText="Task title"
              fullWidth
              underlineFocusStyle={textFieldStyles.underlineFocusStyle}
              floatingLabelFocusStyle={textFieldStyles.floatingLabelFocusStyle}
              value={this.state.task}
              onChange={this.handleTaskChange}
              autoFocus
            />
            <div className="datepicker">
              <DatePicker
                hintText="Start"
                defaultDate={new Date()}
                autoOk
                DateTimeFormat={DateTimeFormat}
                locale={this.props.calendarSystem}
                utils={
                  this.props.calendarSystem === 'fa-IR' ?
                  persianUtils :
                  defaultUtils
                }
                firstDayOfWeek={this.props.firstDayOfWeek}
                textFieldStyle={datePickerStyles.textFieldStyle}
                shouldDisableDate={this.disablePassed}
                value={new Date(this.state.start)}
                onChange={this.handleStartChange}
              />
            </div>
            <div className="datepicker">
              <DatePicker
                hintText="End"
                autoOk
                DateTimeFormat={DateTimeFormat}
                locale={this.props.calendarSystem}
                utils={
                  this.props.calendarSystem === 'fa-IR' ?
                  persianUtils :
                  defaultUtils
                }
                firstDayOfWeek={this.props.firstDayOfWeek}
                textFieldStyle={datePickerStyles.textFieldStyle}
                shouldDisableDate={this.disableEndBeforeStart}
                value={
                  this.state.end ?
                  new Date(this.state.end) :
                  null
                }
                onChange={this.handleEndChange}
              />
            </div>
            <div className="row">
              <TextField
                floatingLabelText="Estimated time"
                underlineFocusStyle={textFieldStyles.underlineFocusStyle}
                floatingLabelFocusStyle={textFieldStyles.floatingLabelFocusStyle}
                value={this.state.estimation}
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
                value={this.state.repetition}
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
