import React from 'react';
import { Provider } from 'react-redux';
import { Redirect, Route, BrowserRouter as Router } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { blue500, green800, pink300 } from 'material-ui/styles/colors';

import store from './store';
import Sidebar from './Sidebar/Sidebar';
import FABContainer from './FAB/FABContainer';
import TaskListContainer from './Task/TaskListContainer';
import IdeaListContainer from './Idea/IdeaListContainer';
import SettingsContainer from './Settings/SettingsContainer';
import About from './About/About';

import { update } from './lib/database';

import './App.css';

injectTapEventPlugin();

const App = () => {
  const muiTheme = getMuiTheme({
    palette: {
      primary1Color: blue500,
    },
    datePicker: {
      selectColor: green800,
    },
    snackbar: {
      actionColor: pink300,
    },
  });
  store.subscribe(() => {
    update(store.getState());
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
};

export default App;
