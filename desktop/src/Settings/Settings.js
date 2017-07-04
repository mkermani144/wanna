import React, { PureComponent } from 'react';
import { List, ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';

import CalendarSystemDialog from './CalendarSystemDialog';
import FirstDayOfWeekDialog from './FirstDayOfWeekDialog';
import './Settings.css';

class Settings extends PureComponent {
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
  handleChangeCalendarSystem = (calendarSystem) => {
    this.props.toggleFullscreen(calendarSystem);
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
        marginLeft: 216,
      },
      mini: {
        marginLeft: 72,
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
            leftCheckbox={
              <Checkbox
                defaultChecked={this.props.showNotYetTasks}
                onCheck={this.handleCheckShowNotYet}
              />
            }
            primaryText="Show not-yet tasks"
          />
          <Divider />
          <ListItem
            leftCheckbox={
              <Checkbox
                defaultChecked={this.props.fullscreen}
                onCheck={this.handleCheckFullscreen}
              />
            }
            primaryText="Start app in fullscreen mode (Needs app restart)"
          />
          <Divider />
          <ListItem
            primaryText="Calendar system"
            secondaryText={this.props.calendarSystem}
            onClick={this.handleRequestCalendarSystemDialogOpen}
          />
          <Divider />
          <ListItem
            primaryText="First day of week"
            secondaryText={weekDays[this.props.firstDayOfWeek]}
            onClick={this.handleRequestFirstDayOfWeekDialogOpen}
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
