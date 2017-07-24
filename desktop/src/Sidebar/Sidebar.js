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
      current: 'tasks',
    };
  }
  changeActiveTab = (tab) => {
    this.setState({
      current: tab,
    });
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
                  this.state.current === 'tasks' ?
                  green600 :
                  null
                }
              />
            }
            style={
              this.state.current === 'tasks' ?
              styles.tasks :
              null
            }
            containerElement={<Link to="/tasks" />}
            onClick={() => this.changeActiveTab('tasks')}
          />
          <ListItem
            primaryText="Ideas"
            leftIcon={
              <LightbulbOutline
                color={
                  this.state.current === 'ideas' ?
                  yellow800 :
                  null
                }
              />
            }
            style={
              this.state.current === 'ideas' ?
              styles.ideas :
              null
            }
            containerElement={<Link to="/ideas" />}
            onClick={() => this.changeActiveTab('ideas')}
          />
          <ListItem
            primaryText="Settings"
            leftIcon={
              <Settings
                color={
                  this.state.current === 'settings' ?
                  indigo600 :
                  null
                }
              />
            }
            style={
              this.state.current === 'settings' ?
              styles.settings :
              null
            }
            containerElement={<Link to="/settings" />}
            onClick={() => this.changeActiveTab('settings')}
          />
          <ListItem
            primaryText="Help"
            leftIcon={
              <Help
                color={
                  this.state.current === 'help' ?
                  cyan600 :
                  null
                }
              />
            }
            style={
              this.state.current === 'help' ?
              styles.help :
              null
            }
            containerElement={<Link to="/help" />}
            onClick={() => this.changeActiveTab('help')}
          />
        </List>
      </Drawer>
    );
  }
}

export default Sidebar;
