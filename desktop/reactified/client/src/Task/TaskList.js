import React, { Component } from 'react';

import Subheader from 'material-ui/Subheader';

import {
  red500,
  green500,
  blue500
} from 'material-ui/styles/colors';

import TaskContainer from './TaskContainer';

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
    return (
      <div className="TaskList">
        <Subheader style={styles.overdue}>Overdue</Subheader>
        <TaskContainer
          color='#F44336'
          text='Fix issue #67 of Wanna'
          units={120}
          repeat={'5 days'}
        />
        <TaskContainer
          color='#FFC107'
          text='Fix issue #68 of Wanna'
          units={120}
          repeat={'5 days'}
        />
        <TaskContainer
          color='#4CAF50'
          text='Fix issue #69 of Wanna'
          units={120}
        />
        <Subheader style={styles.open}>Open</Subheader>
        <TaskContainer
          color='#F44336'
          text='Fix issue #67 of Wanna'
          units={120}
          due='today'
          repeat={'5 days'}
        />
        <TaskContainer
          color='#FFC107'
          text='Fix issue #68 of Wanna'
          units={120}
          due='tomorrow'
          repeat={'5 days'}
        />
        <TaskContainer
          color='#4CAF50'
          text='Fix issue #69 of Wanna'
          units={120}
        />
        <Subheader style={styles.notYet}>Not Yet</Subheader>
        <TaskContainer
          color='#F44336'
          text='Fix issue #67 of Wanna'
          units={120}
          repeat={'5 days'}
        />
        <TaskContainer
          color='#FFC107'
          text='Fix issue #68 of Wanna'
          units={120}
          repeat={'5 days'}
        />
        <TaskContainer
          color='#4CAF50'
          text='Fix issue #69 of Wanna'
          units={120}
        />
      </div>
    );
  }
}

export default TaskList;
