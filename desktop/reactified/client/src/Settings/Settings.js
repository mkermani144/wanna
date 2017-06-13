import React, { Component } from 'react';

import { List, ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';

import './Settings.css';

class Settings extends Component {
  handleCheck = (e, checked) => {
    this.props.toggleNotYet(checked);
  }
  render() {
    return (
      <div className="Settings">
        <List>
          <ListItem
            leftCheckbox={
              <Checkbox
                defaultChecked={true}
                onCheck={this.handleCheck}
              />
            }
            primaryText="Show not-yet tasks"
          />
          <Divider />
          <ListItem
            leftCheckbox={<Checkbox />}
            primaryText="Start app in fullscreen mode (Needs app restart)"
          />
          <Divider />
        </List>
      </div>
    );
  }
}

export default Settings;
