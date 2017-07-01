import React, { PureComponent } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { green600, grey50 } from 'material-ui/styles/colors';
import defaultUtils from 'material-ui/DatePicker/dateUtils';
import persianUtils from 'material-ui-persian-date-picker-utils';

import './ConvertIdeaDialog.css';

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
  handleRequestConvert = () => {
    this.props.onRequestConvert(this.state);
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
    this.props.onRequestConvert(this.state);
    this.props.onRequestDelete();
    this.props.onRequestClose();
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
    const datePickerStyles = {
      textFieldStyle: {
        flex: 1,
      },
    };
    const DateTimeFormat = global.Intl.DateTimeFormat;
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
                value={new Date(this.state.start)}
                shouldDisableDate={this.disablePassed}
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
                value={
                  this.state.end ?
                  new Date(this.state.end) :
                  ''
                }
                shouldDisableDate={this.disableEndBeforeStart}
                onChange={this.handleEndChange}
              />
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
