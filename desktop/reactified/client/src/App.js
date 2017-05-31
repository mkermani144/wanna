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
            <Task />
            <Task />
            <Task />
          </TaskList>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
