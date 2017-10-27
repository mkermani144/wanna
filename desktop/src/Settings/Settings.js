import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';

import CalendarSystemDialog from './CalendarSystemDialog';
import FirstDayOfWeekDialog from './FirstDayOfWeekDialog';
import './Settings.css';

class Settings extends Component {
  constructor() {
    super();
    this.state = {
      calendarSystemDialogOpen: false,
      firstDayOfWeekDialogOpen: false,
    };
  }
  handleCheckShowNotYet = (e, checked) => {
    this.props.toggleNotYet(checked);
  }
  handleCheckFullscreen = (e, checked) => {
    this.props.toggleFullscreen(checked);
  }
  handleRequestCalendarSystemDialogOpen = () => {
    this.setState({
      calendarSystemDialogOpen: true,
    });
  }
  handleRequestFirstDayOfWeekDialogOpen = () => {
    this.setState({
      firstDayOfWeekDialogOpen: true,
    });
  }
  handleRequestCalendarSystemDialogClose = (calendarSystem) => {
    this.props.changeCalendarSystem(calendarSystem);
    this.setState({
      calendarSystemDialogOpen: false,
    });
  }
  handleRequestFirstDayOfWeekDialogClose = (dayNumber) => {
    this.props.changeFirstDayOfWeek(+dayNumber);
    this.setState({
      firstDayOfWeekDialogOpen: false,
    });
  }
  render() {
    const weekDays = {
      0: 'Sunday',
      1: 'Monday',
      6: 'Saturday',
    };
    const marginStyles = {
      expanded: {
        marginLeft: 200,
      },
      mini: {
        marginLeft: 56,
      },
    };
    return (
      <div
        className="Settings"
        style={
          this.props.sidebarExpanded ?
          marginStyles.expanded :
          marginStyles.mini
        }
      >
        <List>
          <ListItem
            primaryText="Calendar system"
            secondaryText={this.props.calendarSystem}
            onClick={this.handleRequestCalendarSystemDialogOpen}
          />
          <Divider />
          <ListItem
            primaryText="First day of the week"
            secondaryText={weekDays[this.props.firstDayOfWeek]}
            onClick={this.handleRequestFirstDayOfWeekDialogOpen}
          />
          <Divider />
          <ListItem
            leftCheckbox={
              <Checkbox
                defaultChecked={this.props.fullscreen}
                onCheck={this.handleCheckFullscreen}
              />
            }
            primaryText="Fullscreen mode"
            secondaryText="Start the app in full width and height. Changes will apply after restarting the app"
          />
          <Divider />
          <ListItem
            id="not-yet-tasks"
            leftCheckbox={
              <Checkbox
                defaultChecked={this.props.showNotYetTasks}
                onCheck={this.handleCheckShowNotYet}
              />
            }
            primaryText="Not-yet tasks"
            secondaryText="Show the section in task list"
          />
          <Divider />
        </List>
        <CalendarSystemDialog
          onRequestClose={this.handleRequestCalendarSystemDialogClose}
          open={this.state.calendarSystemDialogOpen}
          calendarSystem={this.props.calendarSystem}
        />
        <FirstDayOfWeekDialog
          onRequestClose={this.handleRequestFirstDayOfWeekDialogClose}
          open={this.state.firstDayOfWeekDialogOpen}
          firstDayOfWeek={this.props.firstDayOfWeek}
        />
      </div>
    );
  }
}

export default Settings;
