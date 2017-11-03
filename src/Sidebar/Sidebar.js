import React from 'react';
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

const Sidebar = (props) => {
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
      width={props.expanded === false ? 56 : 200}
      zDepth={1}
      open
    >
      <List>
        <ListItem
          id="tasks"
          primaryText="Tasks"
          leftIcon={
            <DoneAll
              color={
                props.currentTab === 'tasks' ?
                green600 :
                null
              }
            />
          }
          style={
            props.currentTab === 'tasks' ?
            styles.tasks :
            null
          }
          containerElement={<Link to="/tasks" />}
          onClick={() => props.changeTab('tasks')}
        />
        <ListItem
          id="ideas"
          primaryText="Ideas"
          leftIcon={
            <LightbulbOutline
              color={
                props.currentTab === 'ideas' ?
                yellow800 :
                null
              }
            />
          }
          style={
            props.currentTab === 'ideas' ?
            styles.ideas :
            null
          }
          containerElement={<Link to="/ideas" />}
          onClick={() => props.changeTab('ideas')}
        />
        <ListItem
          id="settings"
          primaryText="Settings"
          leftIcon={
            <Settings
              color={
                props.currentTab === 'settings' ?
                indigo600 :
                null
              }
            />
          }
          style={
            props.currentTab === 'settings' ?
            styles.settings :
            null
          }
          containerElement={<Link to="/settings" />}
          onClick={() => props.changeTab('settings')}
        />
        <ListItem
          id="help"
          primaryText="Help"
          leftIcon={
            <Help
              color={
                props.currentTab === 'help' ?
                cyan600 :
                null
              }
            />
          }
          style={
            props.currentTab === 'help' ?
            styles.help :
            null
          }
          containerElement={<Link to="/help" />}
          onClick={() => props.changeTab('help')}
        />
      </List>
    </Drawer>
  );
};

export default Sidebar;
