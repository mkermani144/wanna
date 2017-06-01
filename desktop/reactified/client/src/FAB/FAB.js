import React, { Component } from 'react';

import { SpeedDial, SpeedDialItem } from 'react-mui-speeddial';

import Add from 'material-ui/svg-icons/content/add';
import Close from 'material-ui/svg-icons/navigation/close';
import Done from 'material-ui/svg-icons/action/done';
import LightbulbOutline from 'material-ui/svg-icons/action/lightbulb-outline';

import {
  green600,
  yellow800,
} from 'material-ui/styles/colors';

class FAB extends Component {
  render() {
    const styles = {
      speedDial: {
        position: 'absolute',
        right: '20px',
        bottom: '20px',
        zIndex: 1000,
      },
      newTask: {
        color: green600,
      },
      newIdea: {
        color: yellow800,
      },
    };
    return (
      <SpeedDial
        className="SpeedDial"
        fabContentOpen={<Add />}
        fabContentClose={<Close />}
        style={styles.speedDial}
      >
        <SpeedDialItem
          fabContent={<Done />}
        />
        <SpeedDialItem
          fabContent={<LightbulbOutline />}
        />
      </SpeedDial>
    );
  }
}

export default FAB;
