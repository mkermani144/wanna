import React, { PureComponent } from 'react';
import { List, ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';

import CalendarSystemDialog from './CalendarSystemDialog';
import './Settings.css';

class Settings extends PureComponent {
  constructor() {
    super();
    this.state = {
      calendarSystemDialogOpen: false,
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
  handleRequestClose = (calendarSystem) => {
    this.props.changeCalendarSystem(calendarSystem);
    this.setState({
      calendarSystemDialogOpen: false,
    });
  }
  render() {
    return (
      <div className="Settings">
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
        </List>
        <CalendarSystemDialog
          onRequestClose={this.handleRequestClose}
          open={this.state.calendarSystemDialogOpen}
          calendarSystem={this.props.calendarSystem}
        />
      </div>
    );
  }
}

export default Settings;
