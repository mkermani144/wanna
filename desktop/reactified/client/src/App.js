import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Sidebar from './Sidebar/Sidebar';
import FAB from './FAB/FAB';
import TaskList from './Task/TaskList';
import Task from './Task/Task';

import './App.css';

injectTapEventPlugin();

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <Sidebar />
          <FAB />
          <TaskList>
            <Task
              color='red'
              text='Fix issue #67 of Wanna'
              units={120}
              due='tomorrow'
              repeat={'5 days'}
            />
            <Task
              color='orange'
              text='Fix issue #68 of Wanna'
              units={120}
              repeat={'5 days'}
            />
            <Task
              color='green'
              text='Fix issue #69 of Wanna'
              units={120}
            />
          </TaskList>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
