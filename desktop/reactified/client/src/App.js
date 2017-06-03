import React, { Component } from 'react';

import { Provider } from 'react-redux';
import store from './store';

import { Redirect, Route, BrowserRouter as Router } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { blue500 } from 'material-ui/styles/colors';

import Sidebar from './Sidebar/Sidebar';
import FABContainer from './FAB/FABContainer';
import TaskListContainer from './Task/TaskListContainer';
import IdeaListContainer from './Idea/IdeaListContainer';
import SettingsContainer from './Settings/SettingsContainer';
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
      <Provider store={store}>
        <Router>
          <MuiThemeProvider muiTheme={muiTheme}>
            <div className="App">
              <Sidebar />
              <FABContainer />
              <Redirect from="/" to="tasks" />
              <Route path="/tasks" component={TaskListContainer} />
              <Route path="/ideas" component={IdeaListContainer} />
              <Route path="/settings" component={SettingsContainer} />
              <Route path="/about" component={About} />
            </div>
          </MuiThemeProvider>
        </Router>
      </Provider>
    );
  }
}

export default App;
