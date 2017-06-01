import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';

import DoneAll from 'material-ui/svg-icons/action/done-all';
import LightbulbOutline from 'material-ui/svg-icons/action/lightbulb-outline';
import Settings from 'material-ui/svg-icons/action/settings';
import InfoOutline from 'material-ui/svg-icons/action/info-outline';

import {
  green600,
  yellow800,
  blueGrey600,
  grey600,
  grey50
} from 'material-ui/styles/colors';

import './Sidebar.css';

class Sidebar extends Component {
  render() {
    const styles = {
      doneAll: {
        backgroundColor: green600,
      },
      lightbulbOutline: {
        backgroundColor: yellow800,
      },
      settings: {
        backgroundColor: blueGrey600,
      },
      info: {
        backgroundColor: grey600,
      },
    };
    const iconStyle = {
      color: grey50,
    };
    return (
      <Paper className="Sidebar">
        <IconButton
          style={styles.doneAll}
          iconStyle={iconStyle}
          containerElement={<Link to="/tasks" />}
        >
          <DoneAll />
        </IconButton>
        <IconButton
          style={styles.lightbulbOutline}
          iconStyle={iconStyle}
          containerElement={<Link to="/ideas" />}
        >
          <LightbulbOutline />
        </IconButton>
        <IconButton
          style={styles.settings}
          iconStyle={iconStyle}
          containerElement={<Link to="/settings" />}
        >
          <Settings />
        </IconButton>
        <IconButton
          style={styles.info}
          iconStyle={iconStyle}
          containerElement={<Link to="/about" />}
        >
          <InfoOutline />
        </IconButton>
      </Paper>
    );
  }
}

export default Sidebar;
