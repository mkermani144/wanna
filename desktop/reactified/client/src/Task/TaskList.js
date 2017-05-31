import React, { Component } from 'react';

import Subheader from 'material-ui/Subheader';

import {
  red500,
  green500,
  blue500
} from 'material-ui/styles/colors';

import './TaskList.css';

class TaskList extends Component {
  render() {
    const styles = {
      overdue: {
        color: red500,
        marginTop: 20,
      },
      open: {
        color: green500,
        marginTop: 20,
      },
      notYet: {
        color: blue500,
        marginTop: 20,
      },
    }
    let subheader;
    switch (this.props.type) {
      case 'overdue': subheader = <Subheader style={styles.overdue}>Overdue</Subheader>; break;
      case 'open': subheader = <Subheader style={styles.open}>Open</Subheader>; break;
      case 'not-yet': subheader = <Subheader style={styles.notYet}>Not yet</Subheader>; break;
      default: subheader = null;
    }
    return (
      <div className="TaskList">
        {subheader}
        {this.props.children}
      </div>
    );
  }
}

export default TaskList;
