import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Sidebar from './Sidebar/Sidebar';
import FAB from './FAB/FAB';
import TaskList from './Task/TaskList';
import Task from './Task/Task';
import IdeaList from './Idea/IdeaList';
import Idea from './Idea/Idea';
import Settings from './Settings/Settings';

import './App.css';

injectTapEventPlugin();

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <Sidebar />
          <FAB />
          <div className="lists">
            <TaskList type='overdue'>
              <Task
                color='#F44336'
                text='Fix issue #67 of Wanna'
                units={120}
                repeat={'5 days'}
              />
              <Task
                color='#FFC107'
                text='Fix issue #68 of Wanna'
                units={120}
                repeat={'5 days'}
              />
              <Task
                color='#4CAF50'
                text='Fix issue #69 of Wanna'
                units={120}
              />
            </TaskList>
            <TaskList type='open'>
              <Task
                color='#F44336'
                text='Fix issue #67 of Wanna'
                units={120}
                due='today'
                repeat={'5 days'}
              />
              <Task
                color='#FFC107'
                text='Fix issue #68 of Wanna'
                units={120}
                due='tomorrow'
                repeat={'5 days'}
              />
              <Task
                color='#4CAF50'
                text='Fix issue #69 of Wanna'
                units={120}
              />
            </TaskList>
            <TaskList type='not-yet'>
              <Task
                color='#F44336'
                text='Fix issue #67 of Wanna'
                units={120}
                repeat={'5 days'}
              />
              <Task
                color='#FFC107'
                text='Fix issue #68 of Wanna'
                units={120}
                repeat={'5 days'}
              />
              <Task
                color='#4CAF50'
                text='Fix issue #69 of Wanna'
                units={120}
              />
            </TaskList>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
