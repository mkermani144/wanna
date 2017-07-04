import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem } from 'material-ui/List';
import Drawer from 'material-ui/Drawer';
import DoneAll from 'material-ui/svg-icons/action/done-all';
import LightbulbOutline from 'material-ui/svg-icons/action/lightbulb-outline';
import Settings from 'material-ui/svg-icons/action/settings';
import InfoOutline from 'material-ui/svg-icons/action/info-outline';
import {
  green600,
  yellow800,
  blueGrey600,
  grey600,
} from 'material-ui/styles/colors';

import './Sidebar.css';

class Sidebar extends PureComponent {
  constructor() {
    super();
    this.state = {
      expanded: false,
    };
  }
  render() {
    return (
      <Drawer
        className="Sidebar"
        width={this.props.expanded === false ? 56 : 200}
        zDepth={1}
        open
      >
        <List>
          <ListItem
            primaryText="Tasks"
            leftIcon={<DoneAll color={green600} />}
            containerElement={<Link to="/tasks" />}
          />
          <ListItem
            primaryText="Ideas"
            leftIcon={<LightbulbOutline color={yellow800} />}
            containerElement={<Link to="/ideas" />}
          />
          <ListItem
            primaryText="Settings"
            leftIcon={<Settings color={blueGrey600} />}
            containerElement={<Link to="/settings" />}
          />
          <ListItem
            primaryText="About"
            leftIcon={<InfoOutline color={grey600} />}
            containerElement={<Link to="/about" />}
          />
        </List>
      </Drawer>
    );
  }
}

export default Sidebar;
