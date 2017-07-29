import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem } from 'material-ui/List';
import Drawer from 'material-ui/Drawer';
import DoneAll from 'material-ui/svg-icons/action/done-all';
import LightbulbOutline from 'material-ui/svg-icons/action/lightbulb-outline';
import Settings from 'material-ui/svg-icons/action/settings';
import Help from 'material-ui/svg-icons/action/help';
import {
  green600,
  green800,
  yellow800,
  yellow900,
  indigo600,
  indigo900,
  cyan600,
  cyan700,
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
    const styles = {
      tasks: {
        color: green800,
      },
      ideas: {
        color: yellow900,
      },
      settings: {
        color: indigo900,
      },
      help: {
        color: cyan700,
      },
    };
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
            leftIcon={
              <DoneAll
                color={
                  this.props.currentTab === 'tasks' ?
                  green600 :
                  null
                }
              />
            }
            style={
              this.props.currentTab === 'tasks' ?
              styles.tasks :
              null
            }
            containerElement={<Link to="/tasks" />}
            onClick={() => this.props.changeTab('tasks')}
          />
          <ListItem
            primaryText="Ideas"
            leftIcon={
              <LightbulbOutline
                color={
                  this.props.currentTab === 'ideas' ?
                  yellow800 :
                  null
                }
              />
            }
            style={
              this.props.currentTab === 'ideas' ?
              styles.ideas :
              null
            }
            containerElement={<Link to="/ideas" />}
            onClick={() => this.props.changeTab('ideas')}
          />
          <ListItem
            primaryText="Settings"
            leftIcon={
              <Settings
                color={
                  this.props.currentTab === 'settings' ?
                  indigo600 :
                  null
                }
              />
            }
            style={
              this.props.currentTab === 'settings' ?
              styles.settings :
              null
            }
            containerElement={<Link to="/settings" />}
            onClick={() => this.props.changeTab('settings')}
          />
          <ListItem
            primaryText="Help"
            leftIcon={
              <Help
                color={
                  this.props.currentTab === 'help' ?
                  cyan600 :
                  null
                }
              />
            }
            style={
              this.props.currentTab === 'help' ?
              styles.help :
              null
            }
            containerElement={<Link to="/help" />}
            onClick={() => this.props.changeTab('help')}
          />
        </List>
      </Drawer>
    );
  }
}

export default Sidebar;
