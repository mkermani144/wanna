import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { green600, grey50 } from 'material-ui/styles/colors';
import persianUtils from 'material-ui-persian-date-picker-utils';

import {
  parse,
  dayStart,
  todayStart,
  dayEnd,
} from '../lib/date';

import './NewTaskDialog.css';
import disableSelectTextStyle from '../globalStyle';

class NewTaskDialog extends Component {
  constructor() {
    super();
    this.state = {
      estimationValue: 1,
      repetitionValue: 1,
      task: '',
      start: todayStart(),
      end: null,
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
      start: dayStart(parse(start)),
    });
  }
  handleEndChange = (e, end) => {
    this.setState({
      end: dayEnd(parse(end)),
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
      estimationValue: 1,
      repetitionValue: 1,
      task: '',
      start: todayStart(),
      end: null,
      estimation: '',
      repetition: '',
    });
    this.props.onRequestClose();
  }
  handleRequestAdd = () => {
    this.props.onRequestAdd(this.state);
    this.setState({
      estimationValue: 1,
      repetitionValue: 1,
      task: '',
      start: todayStart(),
      end: null,
      estimation: '',
      repetition: '',
    });
  }
  handleRequestFinish = () => {
    this.handleRequestAdd();
    this.handleRequestClose();
  }
  render() {
    const actions = [
      <FlatButton
        id="add-and-finish"
        label="Add and finish"
        primary
        disabled={this.buttonDisabled()}
        onTouchTap={this.handleRequestFinish}
      />,
      <FlatButton
        id="add-and-continue"
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
      MozUserSelect: 'none', /* Firefox */
      MsUserSelect: 'none', /* Internet Explorer */
      KhtmlUserSelect: 'none', /* KHTML browsers (e.g. Konqueror) */
      WebkitUserSelect: 'none', /* Chrome, Safari, and Opera */
      WebkitTouchCallout: 'none', /* Disable Android and iOS callouts */
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
    const localeProps = this.props.calendarSystem === 'fa-IR' ?
    { utils: persianUtils, DateTimeFormat } :
    {};
    return (
      <Dialog
        className="NewTaskDialog"
        title="Add new task"
        actions={actions}
        titleStyle={dialogTitleStyle}
        open={this.props.open}
        onRequestClose={this.props.onRequestClose}
      >
        <br />
        <span style={disableSelectTextStyle}>What do you wanna do?</span>
        <br />
        <div className="textfields">
          <TextField
            inputStyle={disableSelectTextStyle}
            floatingLabelText="Task title"
            fullWidth
            underlineFocusStyle={textFieldStyles.underlineFocusStyle}
            floatingLabelFocusStyle={textFieldStyles.floatingLabelFocusStyle}
            value={this.state.task}
            onChange={this.handleTaskChange}
            autoFocus
          />
          <div className="datepicker" id="start">
            <DatePicker
              defaultDate={new Date()}
              hintText="Start"
              autoOk
              locale={this.props.calendarSystem}
              {...localeProps}
              firstDayOfWeek={this.props.firstDayOfWeek}
              textFieldStyle={datePickerStyles.textFieldStyle}
              minDate={new Date()}
              onChange={this.handleStartChange}
            />
          </div>
          <div className="datepicker" id="end">
            <DatePicker
              id="end"
              hintText="End"
              autoOk
              locale={this.props.calendarSystem}
              {...localeProps}
              firstDayOfWeek={this.props.firstDayOfWeek}
              textFieldStyle={datePickerStyles.textFieldStyle}
              minDate={new Date(this.state.start)}
              onChange={this.handleEndChange}
            />
          </div>
          <div className="row">
            <TextField
              inputStyle={disableSelectTextStyle}
              id="estimated-time"
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
              errorStyle={disableSelectTextStyle}
            />
            <DropDownMenu
              labelStyle={disableSelectTextStyle}
              value={this.state.estimationValue}
              onChange={this.handleEstimationMenuChange}
            >
              <MenuItem value={1} primaryText="Minutes" />
              <MenuItem value={60} primaryText="Hours" />
            </DropDownMenu>
          </div>
          <div className="row">
            <TextField
              inputStyle={disableSelectTextStyle}
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
              errorStyle={disableSelectTextStyle}
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
    );
  }
}

export default NewTaskDialog;
