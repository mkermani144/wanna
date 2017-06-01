import React, { Component } from 'react';

import { Route, BrowserRouter as Router } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { blue500 } from 'material-ui/styles/colors';

import Sidebar from './Sidebar/Sidebar';
import FAB from './FAB/FAB';
import TaskList from './Task/TaskList';
import IdeaList from './Idea/IdeaList';
import Settings from './Settings/Settings';
import About from './About/About';

import './App.css';

injectTapEventPlugin();

class App extends Component {
  render() {
    const muiTheme = getMuiTheme({
      palette: {
        primary1Color: blue500,
      },
    });
    return (
      <Router>
        <MuiThemeProvider muiTheme={muiTheme}>
          <div className="App">
            <Sidebar />
            <FAB />
            <Route path="/tasks" component={TaskList} />
            <Route path="/ideas" component={IdeaList} />
            <Route path="/settings" component={Settings} />
            <Route path="/about" component={About} />
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
